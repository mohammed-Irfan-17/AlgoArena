
package com.algoarena.algoarena_backend.services;

public class GeminiEvaluationResult {

    private final String understandingLevel;
    private final String concept;
    private final String feedback;

    public GeminiEvaluationResult(
            String understandingLevel,
            String concept,
            String feedback
    ) {
        this.understandingLevel = understandingLevel;
        this.concept = concept;
        this.feedback = feedback;
    }

    public String getUnderstandingLevel() {
        return understandingLevel;
    }

    public String getConcept() {
        return concept;
    }

    public String getFeedback() {
        return feedback;
    }
}

