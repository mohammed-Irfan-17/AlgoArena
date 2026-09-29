package com.algoarena.algoarena_backend.controller;

import com.algoarena.algoarena_backend.entity.FinalFeedback;
import com.algoarena.algoarena_backend.services.FinalFeedbackService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/final-feedback")
public class FinalFeedbackController {

    private final FinalFeedbackService finalFeedbackService;

    public FinalFeedbackController(
            FinalFeedbackService finalFeedbackService
    ) {
        this.finalFeedbackService =
                finalFeedbackService;
    }

    @GetMapping("/submission/{submissionId}")
    public FinalFeedback getFinalFeedback(
            @PathVariable Long submissionId
    ) {

        return finalFeedbackService
                .generateFinalFeedback(submissionId);
    }
}