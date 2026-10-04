package com.algoarena.algoarena_backend.controller.codeexecution;

import com.algoarena.algoarena_backend.entity.codeexecution.TestCase;
import com.algoarena.algoarena_backend.services.codeexecution.CodeExecutionService;
import com.algoarena.algoarena_backend.services.codeexecution.TestCaseService;
import com.algoarena.algoarena_backend.services.codeexecution.ExecutionRequest;
import com.algoarena.algoarena_backend.services.codeexecution.ExecutionResponse;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/code-execution")
@CrossOrigin(origins = "http://localhost:5173")
public class CodeExecutionController {

    private final CodeExecutionService codeExecutionService;

    private final TestCaseService testCaseService;


    public CodeExecutionController(
            CodeExecutionService codeExecutionService,
            TestCaseService testCaseService
    ) {

        this.codeExecutionService =
                codeExecutionService;

        this.testCaseService =
                testCaseService;
    }


    @GetMapping("/test-cases/{problemId}")
    public List<TestCase> getTestCases(
            @PathVariable Long problemId
    ) {

        return testCaseService
                .getTestCasesByProblem(problemId);
    }


    @PostMapping("/test-cases")
    public TestCase createTestCase(
            @RequestBody TestCase testCase
    ) {

        return testCaseService
                .createTestCase(testCase);
    }


    @GetMapping("/test-case/{id}")
    public TestCase getTestCase(
            @PathVariable Long id
    ) {

        return testCaseService
                .getTestCaseById(id);
    }


    @PostMapping("/run")
    public ExecutionResponse runCode(
            @RequestBody ExecutionRequest request
    ) {

        System.out.println(
                "========== CODE EXECUTION REQUEST =========="
        );

        System.out.println(
                "Problem ID: " +
                        request.getProblemId()
        );

        System.out.println(
                "User ID: " +
                        request.getUserId()
        );


        return codeExecutionService.executeCode(

                request.getProblemId(),

                request.getCode(),

                request.getUserId()

        );
    }
}

