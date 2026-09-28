package com.algoarena.algoarena_backend.controller;

import com.algoarena.algoarena_backend.dto.*;
import com.algoarena.algoarena_backend.entity.UnderstandingEvaluation;
import com.algoarena.algoarena_backend.services.UnderstandingEvaluationService;
import org.springframework.web.bind.annotation.*;
import com.algoarena.algoarena_backend.dto.ConceptStatusResponse;
import com.algoarena.algoarena_backend.dto.ProblemRecommendationResponse;

import java.util.List;

@RestController
@RequestMapping("/api/evaluations")
public class UnderstandingEvaluationController {

    private final UnderstandingEvaluationService evaluationService;

    public UnderstandingEvaluationController(
            UnderstandingEvaluationService evaluationService
    ) {
        this.evaluationService = evaluationService;
    }

    @PostMapping
    public UnderstandingEvaluation saveEvaluation(
            @RequestBody UnderstandingEvaluation evaluation
    ) {
        return evaluationService.saveEvaluation(evaluation);
    }

    @GetMapping("/submission/{submissionId}")
    public List<UnderstandingEvaluation> getBySubmission(
            @PathVariable Long submissionId
    ) {
        return evaluationService.getBySubmission(submissionId);
    }

    @GetMapping("/user/{userId}")
    public List<UnderstandingEvaluation> getByUser(
            @PathVariable Long userId
    ) {
        return evaluationService.getByUser(userId);
    }

    @GetMapping("/user/{userId}/summary")
    public List<UserUnderstandingSummary> getUnderstandingSummary(
            @PathVariable Long userId
    ) {
        return evaluationService.getUnderstandingSummary(userId);
    }

    @GetMapping("/user/{userId}/weak-concepts")
    public List<WeakConceptResponse> getWeakConcepts(
            @PathVariable Long userId
    ) {
        return evaluationService.getWeakConcepts(userId);
    }

    @GetMapping("/user/{userId}/progress")
    public UserProgressResponse getUserProgress(
            @PathVariable Long userId
    ) {
        return evaluationService.getUserProgress(userId);
    }

    @GetMapping("/user/{userId}/history")
    public List<ConceptHistoryResponse> getUserHistory(
            @PathVariable Long userId
    ) {
        return evaluationService.getUserHistory(userId);
    }

    @GetMapping("/user/{userId}/concept-progress")
    public List<ConceptProgressResponse> getConceptProgress(
            @PathVariable Long userId
    ) {
        return evaluationService.getConceptProgress(userId);
    }

    @GetMapping("/user/{userId}/concept-status")
    public List<ConceptStatusResponse> getConceptStatuses(
            @PathVariable Long userId
    ) {
        return evaluationService.getConceptStatuses(userId);
    }

    @GetMapping("/user/{userId}/recommendations")
    public List<ProblemRecommendationResponse> getRecommendations(
            @PathVariable Long userId
    ) {
        return evaluationService.getRecommendations(userId);
    }












}

