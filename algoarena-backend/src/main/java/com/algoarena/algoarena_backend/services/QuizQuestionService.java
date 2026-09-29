package com.algoarena.algoarena_backend.services;

import com.algoarena.algoarena_backend.entity.Problem;
import com.algoarena.algoarena_backend.entity.QuizQuestion;
import com.algoarena.algoarena_backend.repository.ProblemRepository;
import com.algoarena.algoarena_backend.repository.QuizQuestionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuizQuestionService {

    private final QuizQuestionRepository quizQuestionRepository;
    private final ProblemRepository problemRepository;
    private final GeminiService geminiService;

    public QuizQuestionService(
            QuizQuestionRepository quizQuestionRepository,
            ProblemRepository problemRepository,
            GeminiService geminiService
    ) {
        this.quizQuestionRepository = quizQuestionRepository;
        this.problemRepository = problemRepository;
        this.geminiService = geminiService;
    }

    public List<QuizQuestion> generateQuestions(
            Long submissionId,
            Long problemId
    ) {

        Problem problem =
                problemRepository.findById(problemId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Problem not found"
                                ));

        List<String> generatedQuestions =
                geminiService.generateQuizQuestions(
                        problem.getDescription(),
                        problem.getConcept()
                );

        List<QuizQuestion> savedQuestions =
                new ArrayList<>();

        int questionNumber = 1;

        for (String questionText : generatedQuestions) {

            if (questionText == null ||
                    questionText.trim().isEmpty()) {
                continue;
            }

            QuizQuestion question =
                    new QuizQuestion(
                            submissionId,
                            problemId,
                            questionNumber,
                            questionText.trim()
                    );

            savedQuestions.add(
                    quizQuestionRepository.save(question)
            );

            questionNumber++;
        }

        return savedQuestions;
    }

    public List<QuizQuestion> getQuestionsBySubmission(
            Long submissionId
    ) {
        return quizQuestionRepository
                .findBySubmissionId(submissionId);
    }
}

