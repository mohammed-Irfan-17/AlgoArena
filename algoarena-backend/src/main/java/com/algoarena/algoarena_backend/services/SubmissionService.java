package com.algoarena.algoarena_backend.services;

import com.algoarena.algoarena_backend.entity.Submission;
import com.algoarena.algoarena_backend.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final SimpleJudgeService simpleJudgeService;

    public SubmissionService(
            SubmissionRepository submissionRepository,
            SimpleJudgeService simpleJudgeService
    ) {
        this.submissionRepository = submissionRepository;
        this.simpleJudgeService = simpleJudgeService;
    }

    /*
     * Existing submission flow.
     *
     * Kept for compatibility with the existing
     * /api/submissions POST endpoint.
     */
    public Submission createSubmission(Submission submission) {

        String result =
                simpleJudgeService.judge(submission);

        submission.setStatus(result);

        if ("ACCEPTED".equals(result)) {
            submission.setExecutionTime(120);
        } else {
            submission.setExecutionTime(null);
        }

        return submissionRepository.save(submission);
    }

    /*
     * Used by the code-execution → quiz flow.
     *
     * The code has already been executed and accepted
     * by CodeExecutionService, so we must NOT execute
     * the code again here.
     */
    public Submission saveAcceptedSubmission(
            Submission submission
    ) {

        submission.setStatus("ACCEPTED");

        if (submission.getExecutionTime() == null) {
            submission.setExecutionTime(120);
        }

        return submissionRepository.save(submission);
    }

    public List<Submission> getSubmissionsByUser(
            Long userId
    ) {
        return submissionRepository.findByUserId(userId);
    }

    public List<Submission> getSubmissionsByProblem(
            Long problemId
    ) {
        return submissionRepository.findByProblemId(problemId);
    }
}

