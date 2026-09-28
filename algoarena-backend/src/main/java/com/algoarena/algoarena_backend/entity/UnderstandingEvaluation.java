package com.algoarena.algoarena_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "understanding_evaluations")
public class UnderstandingEvaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long answerId;

    private Long questionId;

    private Long submissionId;

    private Long userId;

    private String understandingLevel;

    private String concept;

    private String feedback;

    public UnderstandingEvaluation() {
    }

    public UnderstandingEvaluation(
            Long answerId,
            Long questionId,
            Long submissionId,
            Long userId,
            String understandingLevel,
            String concept,
            String feedback
    ) {
        this.answerId = answerId;
        this.questionId = questionId;
        this.submissionId = submissionId;
        this.userId = userId;
        this.understandingLevel = understandingLevel;
        this.concept = concept;
        this.feedback = feedback;
    }

    public Long getId() {
        return id;
    }

    public Long getAnswerId() {
        return answerId;
    }

    public void setAnswerId(Long answerId) {
        this.answerId = answerId;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public Long getSubmissionId() {
        return submissionId;
    }

    public void setSubmissionId(Long submissionId) {
        this.submissionId = submissionId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUnderstandingLevel() {
        return understandingLevel;
    }

    public void setUnderstandingLevel(String understandingLevel) {
        this.understandingLevel = understandingLevel;
    }

    public String getConcept() {
        return concept;
    }

    public void setConcept(String concept) {
        this.concept = concept;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}

