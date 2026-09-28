package com.algoarena.algoarena_backend.dto;

import java.util.List;

public class ConceptRecommendationResponse {

    private final String concept;
    private final List<ProblemRecommendationResponse> problems;

    public ConceptRecommendationResponse(
            String concept,
            List<ProblemRecommendationResponse> problems
    ) {
        this.concept = concept;
        this.problems = problems;
    }

    public String getConcept() {
        return concept;
    }

    public List<ProblemRecommendationResponse> getProblems() {
        return problems;
    }
}

