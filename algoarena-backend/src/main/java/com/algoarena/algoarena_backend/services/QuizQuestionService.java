
        package com.algoarena.algoarena_backend.services;

import com.algoarena.algoarena_backend.entity.QuizQuestion;
import com.algoarena.algoarena_backend.repository.QuizQuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizQuestionService {

    private final QuizQuestionRepository quizQuestionRepository;

    public QuizQuestionService(
            QuizQuestionRepository quizQuestionRepository
    ) {
        this.quizQuestionRepository = quizQuestionRepository;
    }

    public QuizQuestion createQuestion(QuizQuestion question) {
        return quizQuestionRepository.save(question);
    }

    public List<QuizQuestion> getQuestionsBySubmission(
            Long submissionId
    ) {
        return quizQuestionRepository.findBySubmissionId(submissionId);
    }
}

