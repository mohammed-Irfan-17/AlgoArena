package com.algoarena.algoarena_backend.services;

import com.algoarena.algoarena_backend.dto.ConceptProgressStatusResponse;
import com.algoarena.algoarena_backend.dto.ConceptRecommendationResponse;
import com.algoarena.algoarena_backend.dto.ConceptStatusResponse;
import com.algoarena.algoarena_backend.dto.FinalDashboardResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final UnderstandingEvaluationService
            evaluationService;

    public DashboardService(
            UnderstandingEvaluationService evaluationService
    ) {
        this.evaluationService = evaluationService;
    }

    public FinalDashboardResponse getDashboard(
            Long userId
    ) {

        List<ConceptProgressStatusResponse> progress =
                evaluationService.getFinalProgress(userId);

        List<ConceptStatusResponse> conceptStatuses =
                evaluationService.getConceptStatuses(userId);

        List<ConceptRecommendationResponse> recommendations =
                evaluationService.getGroupedRecommendations(userId);

        return new FinalDashboardResponse(
                progress,
                conceptStatuses,
                recommendations
        );
    }
}
