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

        /*
         * Only save the answer here.
         *
         * We DO NOT evaluate immediately.
         *
         * Why?
         *
         * The student submits 5 answers for the same submission.
         * The code analysis should be performed ONCE for the whole
         * submission, not once for every answer.
         */
        return quizAnswerRepository.save(answer);
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