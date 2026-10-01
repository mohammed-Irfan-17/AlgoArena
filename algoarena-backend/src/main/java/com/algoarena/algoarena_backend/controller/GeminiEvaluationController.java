package com.algoarena.algoarena_backend.controller;

import com.algoarena.algoarena_backend.dto.SubmissionEvaluationResponse;
import com.algoarena.algoarena_backend.entity.*;
import com.algoarena.algoarena_backend.repository.*;
import com.algoarena.algoarena_backend.services.CodeAnalysisResult;
import com.algoarena.algoarena_backend.services.GeminiEvaluationResult;
import com.algoarena.algoarena_backend.services.GeminiService;
import com.algoarena.algoarena_backend.services.UnderstandingEvaluationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gemini")
public class GeminiEvaluationController {

    private final GeminiService geminiService;
    private final QuizAnswerRepository quizAnswerRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final ProblemRepository problemRepository;
    private final UnderstandingEvaluationService evaluationService;
    private final UnderstandingEvaluationRepository evaluationRepository;
    private final SubmissionRepository submissionRepository;
    public GeminiEvaluationController(
            GeminiService geminiService,
            QuizAnswerRepository quizAnswerRepository,
            QuizQuestionRepository quizQuestionRepository,
            ProblemRepository problemRepository,
            UnderstandingEvaluationService evaluationService,
            UnderstandingEvaluationRepository evaluationRepository,
             SubmissionRepository submissionRepository
    ) {
        this.geminiService = geminiService;
        this.quizAnswerRepository = quizAnswerRepository;
        this.quizQuestionRepository = quizQuestionRepository;
        this.problemRepository = problemRepository;
        this.evaluationService = evaluationService;
        this.evaluationRepository = evaluationRepository;
        this.submissionRepository = submissionRepository;
    }

    @PostMapping("/evaluate/{answerId}")
    public UnderstandingEvaluation evaluateAnswer(
            @PathVariable Long answerId
    ) {

        // 1. Prevent duplicate evaluation
        if (evaluationService.alreadyEvaluated(answerId)) {
            return evaluationRepository
                    .findByAnswerId(answerId)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Evaluation not found"
                            ));
        }

        // 2. Get the student's answer
        QuizAnswer answer =
                quizAnswerRepository
                        .findById(answerId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Answer not found"
                                ));

        // 3. Get the question
        QuizQuestion question =
                quizQuestionRepository
                        .findById(answer.getQuestionId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Question not found"
                                ));

        // 4. Get the problem
        Problem problem =
                problemRepository
                        .findById(question.getProblemId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Problem not found"
                                ));

        // 5. Get the student's submission
        Submission submission =
                submissionRepository
                        .findById(answer.getSubmissionId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Submission not found"
                                ));

        // 6. Analyze the student's actual code
        CodeAnalysisResult codeAnalysis =
                geminiService.analyzeCode(
                        problem.getDescription(),
                        problem.getConcept(),
                        submission.getCode(),
                        submission.getLanguage()
                );

        // 7. Evaluate the answer in the context of
        //    the student's actual coding approach
        GeminiEvaluationResult result =
                geminiService.evaluateAnswer(
                        problem.getDescription(),
                        problem.getConcept(),
                        question.getQuestion(),
                        answer.getAnswer(),
                        submission.getCode(),
                        codeAnalysis
                );

        // 8. Create evaluation record
        UnderstandingEvaluation evaluation =
                new UnderstandingEvaluation(
                        answer.getId(),
                        question.getId(),
                        answer.getSubmissionId(),
                        answer.getUserId(),
                        result.getUnderstandingLevel(),
                        result.getConcept(),
                        result.getFeedback()
                );

        // 9. Save evaluation
        return evaluationService.saveEvaluation(evaluation);
    }
    @PostMapping("/evaluate-submission/{submissionId}")
    public SubmissionEvaluationResponse evaluateSubmission(
            @PathVariable Long submissionId
    ) {

        int evaluatedAnswers =
                evaluationService.evaluateSubmission(submissionId);

        return new SubmissionEvaluationResponse(
                submissionId,
                evaluatedAnswers
        );
    }
}

