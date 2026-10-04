
package com.algoarena.algoarena_backend.services.codeexecution;

public class ExecutionResponse {

    private String status;

    private int totalTestCases;

    private int passedTestCases;

    private String message;

    private Long submissionId;


    public ExecutionResponse() {
    }


    public ExecutionResponse(
            String status,
            int totalTestCases,
            int passedTestCases,
            String message
    ) {

        this.status = status;

        this.totalTestCases =
                totalTestCases;

        this.passedTestCases =
                passedTestCases;

        this.message =
                message;
    }


    public String getStatus() {

        return status;
    }


    public int getTotalTestCases() {

        return totalTestCases;
    }


    public int getPassedTestCases() {

        return passedTestCases;
    }


    public String getMessage() {

        return message;
    }


    public Long getSubmissionId() {

        return submissionId;
    }


    public void setSubmissionId(
            Long submissionId
    ) {

        this.submissionId =
                submissionId;
    }
}
