package com.algoarena.algoarena_backend.services.codeexecution;

import com.algoarena.algoarena_backend.entity.codeexecution.TestCase;
import com.algoarena.algoarena_backend.repository.codeexecution.TestCaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestCaseService {

    private final TestCaseRepository testCaseRepository;

    public TestCaseService(TestCaseRepository testCaseRepository) {
        this.testCaseRepository = testCaseRepository;
    }

    public TestCase createTestCase(TestCase testCase) {
        return testCaseRepository.save(testCase);
    }

    public List<TestCase> getTestCasesByProblem(Long problemId) {
        return testCaseRepository.findByProblemId(problemId);
    }

    public TestCase getTestCaseById(Long id) {
        return testCaseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Test case not found")
                );
    }
}