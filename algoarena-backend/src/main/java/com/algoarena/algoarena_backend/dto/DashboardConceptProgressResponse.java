
package com.algoarena.algoarena_backend.dto;

public class DashboardConceptProgressResponse {

    private String concept;

    private int solvedQuestions;

    private int totalQuestions;

    private double percentage;

    private String status;


    public DashboardConceptProgressResponse(
            String concept,
            int solvedQuestions,
            int totalQuestions,
            double percentage,
            String status
    ) {
        this.concept = concept;
        this.solvedQuestions = solvedQuestions;
        this.totalQuestions = totalQuestions;
        this.percentage = percentage;
        this.status = status;
    }


    public String getConcept() {
        return concept;
    }


    public int getSolvedQuestions() {
        return solvedQuestions;
    }


    public int getTotalQuestions() {
        return totalQuestions;
    }


    public double getPercentage() {
        return percentage;
    }


    public String getStatus() {
        return status;
    }
}

