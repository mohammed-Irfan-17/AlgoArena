package com.algoarena.algoarena_backend.dto;

public class ConceptProgressStatusResponse {

    private final String concept;
    private final String status;

    public ConceptProgressStatusResponse(
            String concept,
            String status
    ) {
        this.concept = concept;
        this.status = status;
    }

    public String getConcept() {
        return concept;
    }

    public String getStatus() {
        return status;
    }
}