package com.algoarena.algoarena_backend.services.codeexecution;

import com.algoarena.algoarena_backend.entity.codeexecution.TestCase;
import com.algoarena.algoarena_backend.repository.codeexecution.TestCaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CodeExecutionService {

    private final TestCaseRepository testCaseRepository;
    private final JavaCodeExecutor javaCodeExecutor;

    public CodeExecutionService(
            TestCaseRepository testCaseRepository,
            JavaCodeExecutor javaCodeExecutor
    ) {
        this.testCaseRepository = testCaseRepository;
        this.javaCodeExecutor = javaCodeExecutor;
    }

    public ExecutionResponse executeCode(
            Long problemId,
            String code
    ) {

        List<TestCase> testCases =
                testCaseRepository.findByProblemId(problemId);

        if (testCases.isEmpty()) {

            return new ExecutionResponse(
                    "ERROR",
                    0,
                    0,
                    "No test cases found for this problem."
            );
        }

        int passed = 0;

        for (TestCase testCase : testCases) {

            ExecutionResponse result =
                    javaCodeExecutor.execute(
                            problemId,
                            code,
                            testCase.getInput(),
                            testCase.getExpectedOutput()
                    );

            if ("ACCEPTED".equals(result.getStatus())) {

                passed++;

                continue;
            }

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

        return new ExecutionResponse(
                "ACCEPTED",
                testCases.size(),
                passed,
                "All test cases passed."
        );
    }
}