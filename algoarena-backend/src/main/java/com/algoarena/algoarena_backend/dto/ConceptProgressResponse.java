
package com.algoarena.algoarena_backend.dto;

public class ConceptProgressResponse {

    private final String concept;
    private final String currentStatus;
    private final String trend;
    private final int attempts;

    public ConceptProgressResponse(
            String concept,
            String currentStatus,
            String trend,
            int attempts
    ) {
        this.concept = concept;
        this.currentStatus = currentStatus;
        this.trend = trend;
        this.attempts = attempts;
    }

    public String getConcept() {
        return concept;
    }

    public String getCurrentStatus() {
        return currentStatus;
    }

    public String getTrend() {
        return trend;
    }

    public int getAttempts() {
        return attempts;
    }
}
