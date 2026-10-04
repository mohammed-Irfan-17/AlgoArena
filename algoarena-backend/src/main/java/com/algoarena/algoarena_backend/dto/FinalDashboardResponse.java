package com.algoarena.algoarena_backend.dto;

import java.util.List;

public class FinalDashboardResponse {

    private int solvedQuestions;

    private int totalQuestions;

    private double overallPercentage;

    private List<
            DashboardConceptProgressResponse
            > progress;

    private List<
            ConceptStatusResponse
            > conceptStatuses;

    private List<
            ConceptRecommendationResponse
            > recommendations;


    public FinalDashboardResponse(
            int solvedQuestions,
            int totalQuestions,
            List<
                    DashboardConceptProgressResponse
                    > progress,
            List<
                    ConceptStatusResponse
                    > conceptStatuses,
            List<
                    ConceptRecommendationResponse
                    > recommendations
    ) {

        this.solvedQuestions =
                solvedQuestions;

        this.totalQuestions =
                totalQuestions;

        this.overallPercentage =
                totalQuestions == 0
                        ? 0.0
                        : Math.round(
                        (
                                (double)
                                        solvedQuestions
                                        /
                                        totalQuestions
                        )
                                * 1000.0
                ) / 10.0;

        this.progress =
                progress;

        this.conceptStatuses =
                conceptStatuses;

        this.recommendations =
                recommendations;
    }


    public int getSolvedQuestions() {
        return solvedQuestions;
    }


    public int getTotalQuestions() {
        return totalQuestions;
    }


    public double getOverallPercentage() {
        return overallPercentage;
    }


    public List<
            DashboardConceptProgressResponse
            > getProgress() {

        return progress;
    }


    public List<
            ConceptStatusResponse
            > getConceptStatuses() {

        return conceptStatuses;
    }


    public List<
            ConceptRecommendationResponse
            > getRecommendations() {

        return recommendations;
    }
}

