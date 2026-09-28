
package com.algoarena.algoarena_backend.dto;

public class UserProgressResponse {

    private final Long userId;
    private final int totalEvaluations;
    private final int good;
    private final int partial;
    private final int poor;

    public UserProgressResponse(
            Long userId,
            int totalEvaluations,
            int good,
            int partial,
            int poor
    ) {
        this.userId = userId;
        this.totalEvaluations = totalEvaluations;
        this.good = good;
        this.partial = partial;
        this.poor = poor;
    }

    public Long getUserId() {
        return userId;
    }

    public int getTotalEvaluations() {
        return totalEvaluations;
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
}

