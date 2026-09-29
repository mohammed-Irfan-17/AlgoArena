package com.algoarena.algoarena_backend.services;

import com.algoarena.algoarena_backend.dto.*;
import com.algoarena.algoarena_backend.entity.Problem;
import com.algoarena.algoarena_backend.entity.QuizAnswer;
import com.algoarena.algoarena_backend.entity.QuizQuestion;
import com.algoarena.algoarena_backend.entity.UnderstandingEvaluation;
import com.algoarena.algoarena_backend.repository.ProblemRepository;
import com.algoarena.algoarena_backend.repository.QuizAnswerRepository;
import com.algoarena.algoarena_backend.repository.QuizQuestionRepository;
import com.algoarena.algoarena_backend.repository.UnderstandingEvaluationRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class UnderstandingEvaluationService {

    private final QuizAnswerRepository quizAnswerRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final GeminiService geminiService;
    private final UnderstandingEvaluationRepository evaluationRepository;
    private final ProblemRepository problemRepository;

    public UnderstandingEvaluationService(
            UnderstandingEvaluationRepository evaluationRepository,
            ProblemRepository problemRepository,
            QuizAnswerRepository quizAnswerRepository,
            QuizQuestionRepository quizQuestionRepository,
            GeminiService geminiService
    ) {
        this.evaluationRepository = evaluationRepository;
        this.problemRepository = problemRepository;
        this.quizAnswerRepository = quizAnswerRepository;
        this.quizQuestionRepository = quizQuestionRepository;
        this.geminiService = geminiService;
    }

    public UnderstandingEvaluation saveEvaluation(
            UnderstandingEvaluation evaluation
    ) {
        return evaluationRepository.save(evaluation);
    }

    public boolean alreadyEvaluated(Long answerId) {
        return evaluationRepository.existsByAnswerId(answerId);
    }

    public UnderstandingEvaluation evaluateAnswer(Long answerId) {

        if (alreadyEvaluated(answerId)) {
            return evaluationRepository
                    .findByAnswerId(answerId)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Evaluation already exists"
                            )
                    );
        }

        QuizAnswer answer =
                quizAnswerRepository
                        .findById(answerId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Answer not found"
                                )
                        );

        QuizQuestion question =
                quizQuestionRepository
                        .findById(answer.getQuestionId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Question not found"
                                )
                        );

        Problem problem =
                problemRepository
                        .findById(question.getProblemId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Problem not found"
                                )
                        );

        return evaluateAndSave(
                answer,
                question,
                problem
        );
    }

    public int evaluateSubmission(Long submissionId) {

        List<QuizAnswer> answers =
                quizAnswerRepository.findBySubmissionId(submissionId);

        int evaluatedCount = 0;

        for (QuizAnswer answer : answers) {

            if (alreadyEvaluated(answer.getId())) {
                continue;
            }

            QuizQuestion question =
                    quizQuestionRepository
                            .findById(answer.getQuestionId())
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Question not found"
                                    )
                            );

            Problem problem =
                    problemRepository
                            .findById(question.getProblemId())
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Problem not found"
                                    )
                            );

            evaluateAndSave(
                    answer,
                    question,
                    problem
            );

            evaluatedCount++;
        }

        return evaluatedCount;
    }

    private UnderstandingEvaluation evaluateAndSave(
            QuizAnswer answer,
            QuizQuestion question,
            Problem problem
    ) {

        GeminiEvaluationResult result =
                geminiService.evaluateAnswer(
                        problem.getDescription(),
                        problem.getConcept(),
                        question.getQuestion(),
                        answer.getAnswer()
                );

        UnderstandingEvaluation evaluation =
                new UnderstandingEvaluation(
                        answer.getId(),
                        question.getId(),
                        answer.getSubmissionId(),
                        answer.getUserId(),
                        result.getUnderstandingLevel(),
                        result.getConcept(),
                        result.getFeedback()
                );

        return evaluationRepository.save(evaluation);
    }

    public List<UnderstandingEvaluation> getBySubmission(
            Long submissionId
    ) {
        return evaluationRepository
                .findBySubmissionId(submissionId);
    }

    public FinalFeedbackResponse generateFinalFeedback(
            Long submissionId
    ) {

        List<UnderstandingEvaluation> evaluations =
                evaluationRepository.findBySubmissionId(
                        submissionId
                );

        if (evaluations.isEmpty()) {
            throw new RuntimeException(
                    "No evaluations found for this submission."
            );
        }

        UnderstandingEvaluation firstEvaluation =
                evaluations.get(0);

        QuizQuestion firstQuestion =
                quizQuestionRepository
                        .findById(firstEvaluation.getQuestionId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Question not found"
                                )
                        );

        Problem problem =
                problemRepository
                        .findById(firstQuestion.getProblemId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Problem not found"
                                )
                        );

        String feedback =
                geminiService.generateFinalFeedback(
                        problem.getDescription(),
                        problem.getConcept(),
                        evaluations
                );

        return new FinalFeedbackResponse(
                submissionId,
                feedback
        );
    }

    public List<UnderstandingEvaluation> getByUser(
            Long userId
    ) {
        return evaluationRepository
                .findByUserIdOrderByIdAsc(userId);
    }

    public List<UserUnderstandingSummary> getUnderstandingSummary(
            Long userId
    ) {

        List<UnderstandingEvaluation> evaluations =
                evaluationRepository
                        .findByUserIdOrderByIdAsc(userId);

        Map<String, Integer> goodCounts = new HashMap<>();
        Map<String, Integer> partialCounts = new HashMap<>();
        Map<String, Integer> poorCounts = new HashMap<>();

        for (UnderstandingEvaluation evaluation : evaluations) {

            String concept = evaluation.getConcept();

            if ("GOOD".equalsIgnoreCase(
                    evaluation.getUnderstandingLevel())) {

                goodCounts.put(
                        concept,
                        goodCounts.getOrDefault(concept, 0) + 1
                );

            } else if ("PARTIAL".equalsIgnoreCase(
                    evaluation.getUnderstandingLevel())) {

                partialCounts.put(
                        concept,
                        partialCounts.getOrDefault(concept, 0) + 1
                );

            } else if ("POOR".equalsIgnoreCase(
                    evaluation.getUnderstandingLevel())) {

                poorCounts.put(
                        concept,
                        poorCounts.getOrDefault(concept, 0) + 1
                );
            }
        }

        List<UserUnderstandingSummary> result =
                new ArrayList<>();

        Set<String> concepts = new HashSet<>();

        concepts.addAll(goodCounts.keySet());
        concepts.addAll(partialCounts.keySet());
        concepts.addAll(poorCounts.keySet());

        for (String concept : concepts) {

            result.add(
                    new UserUnderstandingSummary(
                            concept,
                            goodCounts.getOrDefault(concept, 0),
                            partialCounts.getOrDefault(concept, 0),
                            poorCounts.getOrDefault(concept, 0)
                    )
            );
        }

        return result;
    }

    public List<WeakConceptResponse> getWeakConcepts(
            Long userId
    ) {

        List<UserUnderstandingSummary> summaries =
                getUnderstandingSummary(userId);

        List<WeakConceptResponse> weakConcepts =
                new ArrayList<>();

        for (UserUnderstandingSummary summary : summaries) {

            if (summary.getPoor() > 0 ||
                    summary.getPartial() > summary.getGood()) {

                weakConcepts.add(
                        new WeakConceptResponse(
                                summary.getConcept(),
                                summary.getGood(),
                                summary.getPartial(),
                                summary.getPoor()
                        )
                );
            }
        }

        return weakConcepts;
    }

    public UserProgressResponse getUserProgress(Long userId) {

        List<UnderstandingEvaluation> evaluations =
                evaluationRepository
                        .findByUserIdOrderByIdAsc(userId);

        int good = 0;
        int partial = 0;
        int poor = 0;

        for (UnderstandingEvaluation evaluation : evaluations) {

            if ("GOOD".equalsIgnoreCase(
                    evaluation.getUnderstandingLevel())) {

                good++;

            } else if ("PARTIAL".equalsIgnoreCase(
                    evaluation.getUnderstandingLevel())) {

                partial++;

            } else if ("POOR".equalsIgnoreCase(
                    evaluation.getUnderstandingLevel())) {

                poor++;
            }
        }

        int total = good + partial + poor;

        return new UserProgressResponse(
                userId,
                total,
                good,
                partial,
                poor
        );
    }

    public List<ConceptHistoryResponse> getUserHistory(
            Long userId
    ) {

        List<UnderstandingEvaluation> evaluations =
                evaluationRepository
                        .findByUserIdOrderByIdAsc(userId);

        List<ConceptHistoryResponse> history =
                new ArrayList<>();

        for (UnderstandingEvaluation evaluation : evaluations) {

            history.add(
                    new ConceptHistoryResponse(
                            evaluation.getConcept(),
                            evaluation.getUnderstandingLevel(),
                            evaluation.getQuestionId(),
                            evaluation.getAnswerId(),
                            evaluation.getSubmissionId()
                    )
            );
        }

        return history;
    }

    public List<ConceptProgressResponse> getConceptProgress(
            Long userId
    ) {

        List<UnderstandingEvaluation> evaluations =
                evaluationRepository
                        .findByUserIdOrderByIdAsc(userId);

        Map<String, List<String>> conceptLevels =
                new HashMap<>();

        for (UnderstandingEvaluation evaluation : evaluations) {

            conceptLevels
                    .computeIfAbsent(
                            evaluation.getConcept(),
                            key -> new ArrayList<>()
                    )
                    .add(
                            evaluation.getUnderstandingLevel()
                    );
        }

        List<ConceptProgressResponse> result =
                new ArrayList<>();

        for (Map.Entry<String, List<String>> entry :
                conceptLevels.entrySet()) {

            String concept = entry.getKey();
            List<String> levels = entry.getValue();

            String currentStatus =
                    calculateCurrentStatus(levels);

            String trend =
                    calculateTrend(levels);

            result.add(
                    new ConceptProgressResponse(
                            concept,
                            currentStatus,
                            trend,
                            levels.size()
                    )
            );
        }

        return result;
    }

    private String calculateCurrentStatus(
            List<String> levels
    ) {

        if (levels.isEmpty()) {
            return "NO_DATA";
        }

        String latest =
                levels.get(levels.size() - 1);

        if ("GOOD".equalsIgnoreCase(latest)) {
            return "GOOD";
        }

        if ("PARTIAL".equalsIgnoreCase(latest)) {
            return "PARTIAL";
        }

        if ("POOR".equalsIgnoreCase(latest)) {
            return "WEAK";
        }

        return "UNKNOWN";
    }

    private String calculateTrend(
            List<String> levels
    ) {

        if (levels.size() < 2) {
            return "NOT_ENOUGH_DATA";
        }

        String first = levels.get(0);
        String last = levels.get(levels.size() - 1);

        int firstScore = getLevelScore(first);
        int lastScore = getLevelScore(last);

        if (lastScore > firstScore) {
            return "IMPROVING";
        }

        if (lastScore < firstScore) {
            return "DECLINING";
        }

        return "STABLE";
    }

    private int getLevelScore(String level) {

        if ("GOOD".equalsIgnoreCase(level)) {
            return 3;
        }

        if ("PARTIAL".equalsIgnoreCase(level)) {
            return 2;
        }

        if ("POOR".equalsIgnoreCase(level)) {
            return 1;
        }

        return 0;
    }

    public List<ConceptStatusResponse> getConceptStatuses(
            Long userId
    ) {

        List<UserUnderstandingSummary> summaries =
                getUnderstandingSummary(userId);

        List<ConceptStatusResponse> result =
                new ArrayList<>();

        for (UserUnderstandingSummary summary : summaries) {

            result.add(
                    new ConceptStatusResponse(
                            summary.getConcept(),
                            summary.getStatus()
                    )
            );
        }

        return result;
    }

    public List<ProblemRecommendationResponse> getRecommendations(
            Long userId
    ) {

        List<ConceptStatusResponse> statuses =
                getConceptStatuses(userId);

        List<ProblemRecommendationResponse> recommendations =
                new ArrayList<>();

        for (ConceptStatusResponse status : statuses) {

            if (!"WEAK".equalsIgnoreCase(
                    status.getStatus())) {
                continue;
            }

            List<Problem> problems =
                    problemRepository.findByConceptIgnoreCase(
                            status.getConcept()
                    );

            for (Problem problem : problems) {

                recommendations.add(
                        new ProblemRecommendationResponse(
                                problem.getId(),
                                problem.getTitle(),
                                problem.getDescription(),
                                problem.getConcept()
                        )
                );
            }
        }

        return recommendations;
    }

    public List<ConceptRecommendationResponse>
    getGroupedRecommendations(Long userId) {

        List<ConceptStatusResponse> statuses =
                getConceptStatuses(userId);

        List<ConceptRecommendationResponse> result =
                new ArrayList<>();

        for (ConceptStatusResponse status : statuses) {

            if (!"WEAK".equalsIgnoreCase(
                    status.getStatus())) {
                continue;
            }

            List<Problem> problems =
                    problemRepository.findByConceptIgnoreCase(
                            status.getConcept()
                    );

            List<ProblemRecommendationResponse>
                    problemResponses =
                    new ArrayList<>();

            for (Problem problem : problems) {

                problemResponses.add(
                        new ProblemRecommendationResponse(
                                problem.getId(),
                                problem.getTitle(),
                                problem.getDescription(),
                                problem.getConcept()
                        )
                );
            }

            if (!problemResponses.isEmpty()) {

                result.add(
                        new ConceptRecommendationResponse(
                                status.getConcept(),
                                problemResponses
                        )
                );
            }
        }

        return result;
    }

    public List<ConceptProgressStatusResponse>
    getFinalProgress(Long userId) {

        List<ConceptProgressResponse> progress =
                getConceptProgress(userId);

        List<ConceptProgressStatusResponse> result =
                new ArrayList<>();

        for (ConceptProgressResponse item : progress) {

            String progressStatus =
                    item.getTrend();

            if ("DECLINING".equalsIgnoreCase(
                    progressStatus)) {

                progressStatus = "LAGGING";
            }

            result.add(
                    new ConceptProgressStatusResponse(
                            item.getConcept(),
                            progressStatus
                    )
            );
        }

        return result;
    }
}