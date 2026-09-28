
        package com.algoarena.algoarena_backend.controller;

import com.algoarena.algoarena_backend.entity.Submission;
import com.algoarena.algoarena_backend.services.SubmissionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping
    public Submission createSubmission(@RequestBody Submission submission) {
        return submissionService.createSubmission(submission);
    }

    @GetMapping("/user/{userId}")
    public List<Submission> getSubmissionsByUser(
            @PathVariable Long userId
    ) {
        return submissionService.getSubmissionsByUser(userId);
    }

    @GetMapping("/problem/{problemId}")
    public List<Submission> getSubmissionsByProblem(
            @PathVariable Long problemId
    ) {
        return submissionService.getSubmissionsByProblem(problemId);
    }
}

