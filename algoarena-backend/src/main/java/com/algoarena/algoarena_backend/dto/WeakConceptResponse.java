package com.algoarena.algoarena_backend.dto;

public class WeakConceptResponse {

    private final String concept;
    private final int good;
    private final int partial;
    private final int poor;
    private final int total;

    public WeakConceptResponse(
            String concept,
            int good,
            int partial,
            int poor
    ) {
        this.concept = concept;
        this.good = good;
        this.partial = partial;
        this.poor = poor;
        this.total = good + partial + poor;
    }

    public String getConcept() {
        return concept;
    }

    public int getGood() {
        return good;
    }

    public int getPartial() {
        return partial;
    }

    public int getPoor() {
        return poor;
    }

    public int getTotal() {
        return total;
    }
}

