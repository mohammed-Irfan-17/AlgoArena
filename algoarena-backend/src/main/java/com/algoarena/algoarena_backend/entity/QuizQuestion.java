
        package com.algoarena.algoarena_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "quiz_questions")
public class QuizQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long submissionId;

    private Long problemId;

    private Integer questionNumber;

    @Column(columnDefinition = "TEXT")
    private String question;

    public QuizQuestion() {
    }

    public QuizQuestion(
            Long submissionId,
            Long problemId,
            Integer questionNumber,
            String question
    ) {
        this.submissionId = submissionId;
        this.problemId = problemId;
        this.questionNumber = questionNumber;
        this.question = question;
    }

    public Long getId() {
        return id;
    }

    public Long getSubmissionId() {
        return submissionId;
    }

    public void setSubmissionId(Long submissionId) {
        this.submissionId = submissionId;
    }

    public Long getProblemId() {
        return problemId;
    }

    public void setProblemId(Long problemId) {
        this.problemId = problemId;
    }

    public Integer getQuestionNumber() {
        return questionNumber;
    }

    public void setQuestionNumber(Integer questionNumber) {
        this.questionNumber = questionNumber;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}

