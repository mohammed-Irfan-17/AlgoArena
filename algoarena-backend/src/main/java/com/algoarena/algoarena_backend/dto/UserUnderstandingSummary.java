
package com.algoarena.algoarena_backend.dto;

public class UserUnderstandingSummary {

    private final String concept;
    private final int good;
    private final int partial;
    private final int poor;
    private final String status;

    public UserUnderstandingSummary(
            String concept,
            int good,
            int partial,
            int poor
    ) {
        this.concept = concept;
        this.good = good;
        this.partial = partial;
        this.poor = poor;
        this.status = calculateStatus(good, partial, poor);
    }

    private String calculateStatus(
            int good,
            int partial,
            int poor
    ) {

        int total = good + partial + poor;

        if (total == 0) {
            return "NO_DATA";
        }

        if (poor > good) {
            return "WEAK";
        }

        if (partial > good) {
            return "PARTIAL";
        }

        return "GOOD";
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

    public String getStatus() {
        return status;
    }
}

