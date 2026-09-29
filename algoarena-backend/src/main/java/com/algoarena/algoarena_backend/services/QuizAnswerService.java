package com.algoarena.algoarena_backend.services;

import com.algoarena.algoarena_backend.entity.QuizAnswer;
import com.algoarena.algoarena_backend.repository.QuizAnswerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizAnswerService {

    private final UnderstandingEvaluationService evaluationService;
    private final QuizAnswerRepository quizAnswerRepository;

    public QuizAnswerService(
            QuizAnswerRepository quizAnswerRepository,
            UnderstandingEvaluationService evaluationService
    ) {
        this.quizAnswerRepository = quizAnswerRepository;
        this.evaluationService = evaluationService;
    }

    public QuizAnswer saveAnswer(QuizAnswer answer) {

        // 1. Save the user's answer
        QuizAnswer savedAnswer =
                quizAnswerRepository.save(answer);

        // 2. Immediately evaluate ONLY this answer
        evaluationService.evaluateAnswer(
                savedAnswer.getId()
        );

        // 3. Return only the saved answer
        // Evaluation details are NOT returned to frontend
        return savedAnswer;
    }

    public List<QuizAnswer> getAnswersBySubmission(
            Long submissionId
    ) {
        return quizAnswerRepository.findBySubmissionId(
                submissionId
        );
    }

    public List<QuizAnswer> getAnswersByUser(
            Long userId
    ) {
        return quizAnswerRepository.findByUserId(userId);
    }
}