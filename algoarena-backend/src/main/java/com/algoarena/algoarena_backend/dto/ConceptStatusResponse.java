package com.algoarena.algoarena_backend.dto;

public class ConceptStatusResponse {

    private final String concept;
    private final String status;

    public ConceptStatusResponse(
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

