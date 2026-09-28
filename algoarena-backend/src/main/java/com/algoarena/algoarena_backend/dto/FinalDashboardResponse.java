package com.algoarena.algoarena_backend.dto;

import java.util.List;

public class FinalDashboardResponse {

    private final List<ConceptProgressStatusResponse> progress;
    private final List<ConceptStatusResponse> conceptStatuses;
    private final List<ConceptRecommendationResponse> recommendations;

    public FinalDashboardResponse(
            List<ConceptProgressStatusResponse> progress,
            List<ConceptStatusResponse> conceptStatuses,
            List<ConceptRecommendationResponse> recommendations
    ) {
        this.progress = progress;
        this.conceptStatuses = conceptStatuses;
        this.recommendations = recommendations;
    }

    public List<ConceptProgressStatusResponse> getProgress() {
        return progress;
    }

    public List<ConceptStatusResponse> getConceptStatuses() {
        return conceptStatuses;
    }

    public List<ConceptRecommendationResponse> getRecommendations() {
        return recommendations;
    }
}

