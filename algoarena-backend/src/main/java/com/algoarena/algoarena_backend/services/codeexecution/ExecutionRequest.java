package com.algoarena.algoarena_backend.services.codeexecution;

public class ExecutionRequest {

    private Long problemId;

    private String code;

    public ExecutionRequest() {
    }

    public Long getProblemId() {
        return problemId;
    }

    public void setProblemId(Long problemId) {
        this.problemId = problemId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}