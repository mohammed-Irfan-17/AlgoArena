package com.algoarena.algoarena_backend.controller;

import com.algoarena.algoarena_backend.dto.SubmissionEvaluationResponse;
import com.algoarena.algoarena_backend.entity.Problem;
import com.algoarena.algoarena_backend.entity.QuizAnswer;
import com.algoarena.algoarena_backend.entity.QuizQuestion;
import com.algoarena.algoarena_backend.entity.UnderstandingEvaluation;
import com.algoarena.algoarena_backend.repository.ProblemRepository;
import com.algoarena.algoarena_backend.repository.QuizAnswerRepository;
import com.algoarena.algoarena_backend.repository.QuizQuestionRepository;
import com.algoarena.algoarena_backend.repository.UnderstandingEvaluationRepository;
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

    public GeminiEvaluationController(
            GeminiService geminiService,
            QuizAnswerRepository quizAnswerRepository,
            QuizQuestionRepository quizQuestionRepository,
            ProblemRepository problemRepository,
            UnderstandingEvaluationService evaluationService,
            UnderstandingEvaluationRepository evaluationRepository
    ) {
        this.geminiService = geminiService;
        this.quizAnswerRepository = quizAnswerRepository;
        this.quizQuestionRepository = quizQuestionRepository;
        this.problemRepository = problemRepository;
        this.evaluationService = evaluationService;
        this.evaluationRepository = evaluationRepository;
    }

    @PostMapping("/evaluate/{answerId}")
    public UnderstandingEvaluation evaluateAnswer(

            @PathVariable Long answerId
    ) {
        if (evaluationService.alreadyEvaluated(answerId)) {
            return evaluationRepository
                    .findByAnswerId(answerId)
                    .orElseThrow(() ->
                            new RuntimeException("Evaluation not found"));
        }

        QuizAnswer answer = quizAnswerRepository
                .findById(answerId)
                .orElseThrow(() ->
                        new RuntimeException("Answer not found"));

        QuizQuestion question = quizQuestionRepository
                .findById(answer.getQuestionId())
                .orElseThrow(() ->
                        new RuntimeException("Question not found"));

        Problem problem = problemRepository
                .findById(question.getProblemId())
                .orElseThrow(() ->
                        new RuntimeException("Problem not found"));

        GeminiEvaluationResult result =
                geminiService.evaluateAnswer(
                        problem.getDescription(),
                        problem.getConcept(),
                        question.getQuestion(),
                        answer.getAnswer()
                );

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

