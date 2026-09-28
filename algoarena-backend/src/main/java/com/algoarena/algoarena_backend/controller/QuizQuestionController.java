
        package com.algoarena.algoarena_backend.controller;

import com.algoarena.algoarena_backend.entity.QuizQuestion;
import com.algoarena.algoarena_backend.services.QuizQuestionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz-questions")
public class QuizQuestionController {

    private final QuizQuestionService quizQuestionService;

    public QuizQuestionController(
            QuizQuestionService quizQuestionService
    ) {
        this.quizQuestionService = quizQuestionService;
    }

    @PostMapping
    public QuizQuestion createQuestion(
            @RequestBody QuizQuestion question
    ) {
        return quizQuestionService.createQuestion(question);
    }

    @GetMapping("/submission/{submissionId}")
    public List<QuizQuestion> getQuestionsBySubmission(
            @PathVariable Long submissionId
    ) {
        return quizQuestionService
                .getQuestionsBySubmission(submissionId);
    }
}

