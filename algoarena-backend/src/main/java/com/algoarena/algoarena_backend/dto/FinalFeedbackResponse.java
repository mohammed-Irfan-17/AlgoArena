package com.algoarena.algoarena_backend.dto;

public class FinalFeedbackResponse {

    private Long submissionId;
    private String feedback;

    public FinalFeedbackResponse() {
    }

    public FinalFeedbackResponse(
            Long submissionId,
            String feedback
    ) {
        this.submissionId = submissionId;
        this.feedback = feedback;
    }

    public Long getSubmissionId() {
        return submissionId;
    }

    public void setSubmissionId(Long submissionId) {
        this.submissionId = submissionId;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}