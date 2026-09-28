package com.algoarena.algoarena_backend.controller;

import com.algoarena.algoarena_backend.entity.QuizAnswer;
import com.algoarena.algoarena_backend.services.QuizAnswerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz-answers")
public class QuizAnswerController {

    private final QuizAnswerService quizAnswerService;

    public QuizAnswerController(
            QuizAnswerService quizAnswerService
    ) {
        this.quizAnswerService = quizAnswerService;
    }

    @PostMapping
    public QuizAnswer saveAnswer(
            @RequestBody QuizAnswer answer
    ) {
        return quizAnswerService.saveAnswer(answer);
    }

    @GetMapping("/submission/{submissionId}")
    public List<QuizAnswer> getAnswersBySubmission(
            @PathVariable Long submissionId
    ) {
        return quizAnswerService
                .getAnswersBySubmission(submissionId);
    }

    @GetMapping("/user/{userId}")
    public List<QuizAnswer> getAnswersByUser(
            @PathVariable Long userId
    ) {
        return quizAnswerService
                .getAnswersByUser(userId);
    }
}

