package com.algoarena.algoarena_backend.config.codeexecution;

import com.algoarena.algoarena_backend.entity.codeexecution.TestCase;
import com.algoarena.algoarena_backend.repository.codeexecution.TestCaseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class TestCaseDataLoader implements CommandLineRunner {

    private final TestCaseRepository testCaseRepository;

    public TestCaseDataLoader(TestCaseRepository testCaseRepository) {
        this.testCaseRepository = testCaseRepository;
    }

    @Override
    public void run(String... args) {

        seedProblem1();
        seedProblem2();
        seedProblem3();
        seedProblem4();
        seedProblem5();
        seedProblem6();
        seedProblem7();
        seedProblem8();
        seedProblem9();
        seedProblem10();
    }

    private void seedProblem1() {

        if (!testCaseRepository.findByProblemId(1L).isEmpty()) {
            return;
        }

        save(1L, "2 7 11 15\n9", "0 1", false);
        save(1L, "3 2 4\n6", "1 2", false);
        save(1L, "3 3\n6", "0 1", true);
        save(1L, "1 5 8 10\n13", "1 2", true);
    }

    private void seedProblem2() {

        if (!testCaseRepository.findByProblemId(2L).isEmpty()) {
            return;
        }

        save(2L, "leetcode", "0", false);
        save(2L, "loveleetcode", "2", false);
        save(2L, "aabb", "-1", true);
        save(2L, "z", "0", true);
    }

    private void seedProblem3() {

        if (!testCaseRepository.findByProblemId(3L).isEmpty()) {
            return;
        }

        save(3L, "1 3 5 7 9\n5", "2", false);
        save(3L, "1 3 5 7 9\n2", "-1", false);
        save(3L, "2 4 6 8 10\n10", "4", true);
        save(3L, "1\n1", "0", true);
    }

    private void seedProblem4() {

        if (!testCaseRepository.findByProblemId(4L).isEmpty()) {
            return;
        }

        save(4L, "4 5 6 7 0 1 2\n0", "4", false);
        save(4L, "4 5 6 7 0 1 2\n3", "-1", false);
        save(4L, "6 7 1 2 3 4 5\n6", "0", true);
        save(4L, "1\n1", "0", true);
    }

    private void seedProblem5() {

        if (!testCaseRepository.findByProblemId(5L).isEmpty()) {
            return;
        }

        save(5L, "-2 1 -3 4 -1 2 1 -5 4", "6", false);
        save(5L, "1", "1", false);
        save(5L, "5 4 -1 7 8", "23", true);
        save(5L, "-5 -2 -8 -1", "-1", true);
    }

    private void seedProblem6() {

        if (!testCaseRepository.findByProblemId(6L).isEmpty()) {
            return;
        }

        save(6L, "0 1 0 3 12", "1 3 12 0 0", false);
        save(6L, "0", "0", false);
        save(6L, "1 2 3", "1 2 3", true);
        save(6L, "0 0 1", "1 0 0", true);
    }

    private void seedProblem7() {

        if (!testCaseRepository.findByProblemId(7L).isEmpty()) {
            return;
        }

        save(7L, "abcabcbb", "3", false);
        save(7L, "bbbbb", "1", false);
        save(7L, "pwwkew", "3", true);
        save(7L, "abcdef", "6", true);
    }

    private void seedProblem8() {

        if (!testCaseRepository.findByProblemId(8L).isEmpty()) {
            return;
        }

        save(8L, "()", "true", false);
        save(8L, "()[]{}", "true", false);
        save(8L, "(]", "false", true);
        save(8L, "([)]", "false", true);
    }

    private void seedProblem9() {

        if (!testCaseRepository.findByProblemId(9L).isEmpty()) {
            return;
        }

        save(
                9L,
                "4\n1 3\n2 6\n8 10\n15 18",
                "1 6\n8 10\n15 18",
                false
        );

        save(
                9L,
                "2\n1 4\n4 5",
                "1 5",
                false
        );

        save(
                9L,
                "3\n1 2\n2 3\n3 4",
                "1 4",
                true
        );
    }

    private void seedProblem10() {

        if (!testCaseRepository.findByProblemId(10L).isEmpty()) {
            return;
        }

        save(10L, "1 2 3 4 5", "5 4 3 2 1", false);
        save(10L, "1 2", "2 1", false);
        save(10L, "1", "1", true);
        save(10L, "", "", true);
    }

    private void save(
            Long problemId,
            String input,
            String expectedOutput,
            boolean hidden
    ) {

        TestCase testCase = new TestCase(
                problemId,
                input,
                expectedOutput,
                hidden
        );

        testCaseRepository.save(testCase);
    }
}