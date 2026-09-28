package com.algoarena.algoarena_backend.dto;

public class SubmissionEvaluationResponse {

    private final Long submissionId;
    private final int evaluatedAnswers;

    public SubmissionEvaluationResponse(
            Long submissionId,
            int evaluatedAnswers
    ) {
        this.submissionId = submissionId;
        this.evaluatedAnswers = evaluatedAnswers;
    }

    public Long getSubmissionId() {
        return submissionId;
    }

    public int getEvaluatedAnswers() {
        return evaluatedAnswers;
    }
}

