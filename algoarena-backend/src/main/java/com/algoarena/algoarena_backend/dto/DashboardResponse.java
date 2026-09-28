package com.algoarena.algoarena_backend.dto;

import com.algoarena.algoarena_backend.dto.ConceptStatusResponse;
import com.algoarena.algoarena_backend.dto.ProblemRecommendationResponse;

import java.util.List;

public class DashboardResponse {

    private final UserProgressResponse progress;
    private final List<ConceptStatusResponse> conceptStatuses;
    private final List<ProblemRecommendationResponse> recommendations;

    public DashboardResponse(
            UserProgressResponse progress,
            List<ConceptStatusResponse> conceptStatuses,
            List<ProblemRecommendationResponse> recommendations
    ) {
        this.progress = progress;
        this.conceptStatuses = conceptStatuses;
        this.recommendations = recommendations;
    }

    public UserProgressResponse getProgress() {
        return progress;
    }

    public List<ConceptStatusResponse> getConceptStatuses() {
        return conceptStatuses;
    }

    public List<ProblemRecommendationResponse> getRecommendations() {
        return recommendations;
    }
}

