package com.algoarena.algoarena_backend.dto;

public class ConceptHistoryResponse {

    private final String concept;
    private final String understandingLevel;
    private final Long questionId;
    private final Long answerId;
    private final Long submissionId;

    public ConceptHistoryResponse(
            String concept,
            String understandingLevel,
            Long questionId,
            Long answerId,
            Long submissionId
    ) {
        this.concept = concept;
        this.understandingLevel = understandingLevel;
        this.questionId = questionId;
        this.answerId = answerId;
        this.submissionId = submissionId;
    }

    public String getConcept() {
        return concept;
    }

    public String getUnderstandingLevel() {
        return understandingLevel;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public Long getAnswerId() {
        return answerId;
    }

    public Long getSubmissionId() {
        return submissionId;
    }
}

