package com.algoarena.algoarena_backend.services.codeexecution;

import com.algoarena.algoarena_backend.entity.Submission;
import com.algoarena.algoarena_backend.entity.codeexecution.TestCase;
import com.algoarena.algoarena_backend.repository.codeexecution.TestCaseRepository;
import com.algoarena.algoarena_backend.services.SubmissionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CodeExecutionService {

    private final TestCaseRepository testCaseRepository;

    private final JavaCodeExecutor javaCodeExecutor;

    private final SubmissionService submissionService;


    public CodeExecutionService(
            TestCaseRepository testCaseRepository,
            JavaCodeExecutor javaCodeExecutor,
            SubmissionService submissionService
    ) {

        this.testCaseRepository =
                testCaseRepository;

        this.javaCodeExecutor =
                javaCodeExecutor;

        this.submissionService =
                submissionService;
    }


    /*
     * ==========================================
     * EXECUTE CODE
     * ==========================================
     */

    public ExecutionResponse executeCode(
            Long problemId,
            String code,
            Long userId
    ) {

        List<TestCase> testCases =
                testCaseRepository.findByProblemId(
                        problemId
                );


        /*
         * No test cases
         */

        if (testCases.isEmpty()) {

            return new ExecutionResponse(
                    "ERROR",
                    0,
                    0,
                    "No test cases found for this problem."
            );
        }


        int passed = 0;


        /*
         * ==========================================
         * RUN ALL TEST CASES
         * ==========================================
         */

        for (TestCase testCase : testCases) {

            ExecutionResponse result =
                    javaCodeExecutor.execute(
                            problemId,
                            code,
                            testCase.getInput(),
                            testCase.getExpectedOutput()
                    );


            if (
                    "ACCEPTED".equals(
                            result.getStatus()
                    )
            ) {

                passed++;

                continue;
            }


            /*
             * One test case failed.
             */

            return new ExecutionResponse(
                    result.getStatus(),
                    testCases.size(),
                    passed,
                    "Test case "
                            + testCase.getId()
                            + " failed. "
                            + result.getMessage()
            );
        }


        /*
         * ==========================================
         * ALL TEST CASES PASSED
         * ==========================================
         */

        /*
         * IMPORTANT:
         *
         * Only now do we create the Submission.
         *
         * This means the dashboard will count this
         * problem as solved.
         */

        if (userId == null) {

            return new ExecutionResponse(
                    "ERROR",
                    testCases.size(),
                    passed,
                    "User information is missing."
            );
        }


        Submission submission =
                new Submission();

        submission.setUserId(userId);

        submission.setProblemId(problemId);

        submission.setCode(code);

        submission.setStatus("ACCEPTED");

        submission.setExecutionTime(120);


        /*
         * Save accepted submission.
         */

        Submission savedSubmission =
                submissionService
                        .saveAcceptedSubmission(
                                submission
                        );


        /*
         * Build response.
         */

        ExecutionResponse response =
                new ExecutionResponse(
                        "ACCEPTED",
                        testCases.size(),
                        passed,
                        "All test cases passed."
                );


        /*
         * Send submissionId back to frontend.
         */

        response.setSubmissionId(
                savedSubmission.getId()
        );


        return response;
    }
}

