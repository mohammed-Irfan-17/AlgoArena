package com.algoarena.algoarena_backend.services;

import com.algoarena.algoarena_backend.entity.FinalFeedback;
import com.algoarena.algoarena_backend.entity.QuizAnswer;
import com.algoarena.algoarena_backend.entity.QuizQuestion;
import com.algoarena.algoarena_backend.entity.UnderstandingEvaluation;
import com.algoarena.algoarena_backend.repository.FinalFeedbackRepository;
import com.algoarena.algoarena_backend.repository.QuizAnswerRepository;
import com.algoarena.algoarena_backend.repository.QuizQuestionRepository;
import com.algoarena.algoarena_backend.repository.UnderstandingEvaluationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FinalFeedbackService {

    private final FinalFeedbackRepository finalFeedbackRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final QuizAnswerRepository quizAnswerRepository;
    private final UnderstandingEvaluationRepository
            evaluationRepository;
    private final GeminiService geminiService;

    public FinalFeedbackService(
            FinalFeedbackRepository finalFeedbackRepository,
            QuizQuestionRepository quizQuestionRepository,
            QuizAnswerRepository quizAnswerRepository,
            UnderstandingEvaluationRepository evaluationRepository,
            GeminiService geminiService
    ) {
        this.finalFeedbackRepository = finalFeedbackRepository;
        this.quizQuestionRepository = quizQuestionRepository;
        this.quizAnswerRepository = quizAnswerRepository;
        this.evaluationRepository = evaluationRepository;
        this.geminiService = geminiService;
    }

    public FinalFeedback generateFinalFeedback(
            Long submissionId
    ) {

        /*
         * --------------------------------------------------
         * 1. Return existing feedback if already generated.
         * --------------------------------------------------
         */

        return finalFeedbackRepository
                .findBySubmissionId(submissionId)
                .orElseGet(() ->
                        createFinalFeedback(submissionId)
                );
    }

    private FinalFeedback createFinalFeedback(
            Long submissionId
    ) {

        /*
         * --------------------------------------------------
         * 2. Get all quiz questions.
         * --------------------------------------------------
         */

        List<QuizQuestion> questions =
                quizQuestionRepository
                        .findBySubmissionId(submissionId);

        if (questions.isEmpty()) {

            throw new RuntimeException(
                    "No quiz questions found for this submission."
            );
        }

        /*
         * --------------------------------------------------
         * 3. Get all submitted answers.
         * --------------------------------------------------
         */

        List<QuizAnswer> answers =
                quizAnswerRepository
                        .findBySubmissionId(submissionId);

        if (answers.size() < questions.size()) {

            throw new RuntimeException(
                    "Quiz is not completed yet. "
                            + "All questions must be answered."
            );
        }

        /*
         * --------------------------------------------------
         * 4. Get all evaluations.
         * --------------------------------------------------
         */

        List<UnderstandingEvaluation> evaluations =
                evaluationRepository
                        .findBySubmissionId(submissionId);

        if (evaluations.size() < questions.size()) {

            throw new RuntimeException(
                    "Quiz evaluation is not complete yet."
            );
        }

        /*
         * --------------------------------------------------
         * 5. Find user.
         * --------------------------------------------------
         */

        Long userId = answers
                .get(0)
                .getUserId();

        /*
         * --------------------------------------------------
         * 6. Build complete evaluation summary.
         * --------------------------------------------------
         */

        StringBuilder evaluationSummary =
                new StringBuilder();

        for (UnderstandingEvaluation evaluation :
                evaluations) {

            evaluationSummary
                    .append("Question ")
                    .append(evaluation.getQuestionId())
                    .append("\n");

            evaluationSummary
                    .append("Concept: ")
                    .append(evaluation.getConcept())
                    .append("\n");

            evaluationSummary
                    .append("Understanding Level: ")
                    .append(evaluation.getUnderstandingLevel())
                    .append("\n");

            evaluationSummary
                    .append("Evaluator Feedback: ")
                    .append(evaluation.getFeedback())
                    .append("\n\n");
        }

        /*
         * --------------------------------------------------
         * 7. Generate final educational feedback.
         * --------------------------------------------------
         */

        String prompt = """
                You are an educational feedback assistant
                for a coding learning platform.

                A student has completed a conceptual quiz
                after solving a coding problem.

                Below are the evaluations of ALL quiz answers.

                Evaluation results:

                %s

                Generate a concise but useful final learning
                feedback report.

                The feedback should contain these sections:

                Overall Understanding:
                Give a short summary of the student's overall
                conceptual understanding.

                What You Understand Well:
                Mention concepts or reasoning that appear strong.

                What You Should Improve:
                Mention conceptual gaps shown by PARTIAL or POOR
                answers.

                Key Concepts to Revisit:
                List the most important concepts the student
                should review.

                Next Learning Step:
                Give a short practical suggestion for what the
                student should study or practice next.

                Important:
                - Do not mention Gemini.
                - Do not expose internal evaluation mechanics.
                - Do not assign a numerical score.
                - Do not be overly verbose.
                - Keep the feedback educational and encouraging.
                - Return plain text.
                """.formatted(
                evaluationSummary
        );

        String feedback =
                geminiService.testGemini(prompt);

        /*
         * --------------------------------------------------
         * 8. Save final feedback.
         * --------------------------------------------------
         */

        FinalFeedback finalFeedback =
                new FinalFeedback(
                        submissionId,
                        userId,
                        feedback
                );

        return finalFeedbackRepository.save(
                finalFeedback
        );
    }
}