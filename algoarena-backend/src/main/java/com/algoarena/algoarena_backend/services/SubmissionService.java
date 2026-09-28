
        package com.algoarena.algoarena_backend.services;

import com.algoarena.algoarena_backend.entity.Problem;
import com.algoarena.algoarena_backend.entity.QuizQuestion;
import com.algoarena.algoarena_backend.entity.Submission;
import com.algoarena.algoarena_backend.repository.ProblemRepository;
import com.algoarena.algoarena_backend.repository.SubmissionRepository;
import com.algoarena.algoarena_backend.repository.QuizQuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final SimpleJudgeService simpleJudgeService;
    private final ProblemRepository problemRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final UnderstandingEvaluationService evaluationService;

    public SubmissionService(
            SubmissionRepository submissionRepository,
            SimpleJudgeService simpleJudgeService,
            ProblemRepository problemRepository,
            QuizQuestionRepository quizQuestionRepository,
           UnderstandingEvaluationService evaluationService
    ) {
        this.submissionRepository = submissionRepository;
        this.simpleJudgeService = simpleJudgeService;
        this.problemRepository = problemRepository;
        this.quizQuestionRepository = quizQuestionRepository;
        this.evaluationService=evaluationService;
    }

    public Submission createSubmission(Submission submission) {

        String result = simpleJudgeService.judge(submission);

        submission.setStatus(result);

        if ("ACCEPTED".equals(result)) {
            submission.setExecutionTime(120);
        } else {
            submission.setExecutionTime(null);
        }

        Submission savedSubmission =
                submissionRepository.save(submission);

        /*
         * Understanding questions are generated
         * ONLY after an ACCEPTED submission.
         */
        if ("ACCEPTED".equals(result)) {

            generateQuestions(savedSubmission);

//            evaluationService.evaluateSubmission(
//                    savedSubmission.getId()
//            );
        }

        return savedSubmission;
    }

    private void generateQuestions(Submission submission) {

        Problem problem = problemRepository
                .findById(submission.getProblemId())
                .orElseThrow(() ->
                        new RuntimeException("Problem not found"));

        String concept = problem.getConcept();

        QuizQuestion question1 = new QuizQuestion(
                submission.getId(),
                problem.getId(),
                1,
                "Explain the main idea behind the "
                        + concept
                        + " approach used in this solution."
        );

        QuizQuestion question2 = new QuizQuestion(
                submission.getId(),
                problem.getId(),
                2,
                "Why does this algorithm work correctly?"
        );

        QuizQuestion question3 = new QuizQuestion(
                submission.getId(),
                problem.getId(),
                3,
                "What is the time complexity of your solution "
                        + "and why?"
        );

        QuizQuestion question4 = new QuizQuestion(
                submission.getId(),
                problem.getId(),
                4,
                "What edge cases should your solution handle?"
        );

        QuizQuestion question5 = new QuizQuestion(
                submission.getId(),
                problem.getId(),
                5,
                "Can you explain one important invariant "
                        + "or reasoning step in your solution?"
        );

        quizQuestionRepository.saveAll(
                List.of(
                        question1,
                        question2,
                        question3,
                        question4,
                        question5
                )
        );
    }

    public List<Submission> getSubmissionsByUser(Long userId) {
        return submissionRepository.findByUserId(userId);
    }

    public List<Submission> getSubmissionsByProblem(Long problemId) {
        return submissionRepository.findByProblemId(problemId);
    }
}

