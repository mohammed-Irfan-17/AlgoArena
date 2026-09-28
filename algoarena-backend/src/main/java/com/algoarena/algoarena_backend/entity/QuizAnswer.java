package com.algoarena.algoarena_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "quiz_answers")
public class QuizAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long questionId;

    private Long submissionId;

    private Long userId;

    @Column(columnDefinition = "TEXT")
    private String answer;

    public QuizAnswer() {
    }

    public QuizAnswer(
            Long questionId,
            Long submissionId,
            Long userId,
            String answer
    ) {
        this.questionId = questionId;
        this.submissionId = submissionId;
        this.userId = userId;
        this.answer = answer;
    }

    public Long getId() {
        return id;
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

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}

