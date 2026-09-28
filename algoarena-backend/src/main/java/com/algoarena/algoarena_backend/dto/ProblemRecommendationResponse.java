
package com.algoarena.algoarena_backend.dto;

public class ProblemRecommendationResponse {

    private final Long problemId;
    private final String title;
    private final String description;
    private final String concept;

    public ProblemRecommendationResponse(
            Long problemId,
            String title,
            String description,
            String concept
    ) {
        this.problemId = problemId;
        this.title = title;
        this.description = description;
        this.concept = concept;
    }

    public Long getProblemId() {
        return problemId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getConcept() {
        return concept;
    }
}

