package com.algoarena.algoarena_backend.services;

import com.algoarena.algoarena_backend.entity.UnderstandingEvaluation;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.errors.ServerException;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GeminiService {

    private final Client client;
    private final ObjectMapper objectMapper;

    @Value("${gemini.model}")
    private String model;

    public GeminiService() {
        this.client = new Client();
        this.objectMapper = new ObjectMapper();
    }
    private GenerateContentResponse generateWithRetry(
            String prompt
    ) {

        int maxAttempts = 3;

        for (int attempt = 1; attempt <= maxAttempts; attempt++) {

            try {

                return client.models.generateContent(
                        model,
                        prompt,
                        null
                );

            } catch (ServerException e) {

                if (attempt == maxAttempts) {
                    throw e;
                }

                try {
                    Thread.sleep(2000L * attempt);
                } catch (InterruptedException interruptedException) {

                    Thread.currentThread().interrupt();

                    throw new RuntimeException(
                            "Gemini retry interrupted",
                            interruptedException
                    );
                }
            }
        }

        throw new RuntimeException(
                "Gemini request failed"
        );
    }

    public String testGemini(String prompt) {

        GenerateContentResponse response =
                generateWithRetry(prompt);

        return response.text();
    }

    public GeminiEvaluationResult evaluateAnswer(
            String problemDescription,
            String concept,
            String question,
            String studentAnswer
    ) {

        String prompt = """
                You are an educational evaluator for a coding platform.

                Evaluate the student's conceptual understanding.

                Problem:
                %s

                Main concept:
                %s

                Question:
                %s

                Student answer:
                %s

                Return ONLY valid JSON.
                Do not use markdown.
                Do not use ```.

                JSON format:

                {
                  "understandingLevel": "GOOD",
                  "concept": "Hash Map",
                  "feedback": "Short educational feedback"
                }

                understandingLevel must be exactly one of:
                GOOD
                PARTIAL
                POOR

                GOOD:
                The student clearly understands the concept.

                PARTIAL:
                The student understands some important parts but has
                a meaningful conceptual gap.

                POOR:
                The answer shows little understanding or contains
                major conceptual errors.

                Focus on conceptual understanding, not grammar or
                programming style.
                """.formatted(
                problemDescription,
                concept,
                question,
                studentAnswer
        );

        GenerateContentResponse response =
                generateWithRetry(prompt);

        String json = response.text();

        try {

            JsonNode root = objectMapper.readTree(json);

            String understandingLevel =
                    root.path("understandingLevel").asText();

            String resultConcept =
                    root.path("concept").asText();

            String feedback =
                    root.path("feedback").asText();

            return new GeminiEvaluationResult(
                    understandingLevel,
                    resultConcept,
                    feedback
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Could not parse Gemini evaluation: " + json,
                    e
            );
        }
    }


    public List<String> generateQuizQuestions(
            String problemDescription,
            String concept
    ) {

        String prompt = """
            You are creating a short conceptual understanding quiz
            for a coding learner.

            Problem:
            %s

            Main concept:
            %s

            Generate exactly 5 questions.

            The questions must test understanding, not code syntax.

            Cover these areas where appropriate:
            1. Core algorithm or approach
            2. Why the approach works
            3. Time or space complexity
            4. Important reasoning or invariant
            5. Edge cases or limitations

            Return ONLY the questions.

            Format:
            1. question
            2. question
            3. question
            4. question
            5. question

            Do not provide answers.
            Do not provide explanations.
            Do not use markdown.
            """.formatted(
                problemDescription,
                concept
        );

        GenerateContentResponse response =
                generateWithRetry(prompt);

        String responseText =
                response.text();

        List<String> questions =
                new ArrayList<>();

        String[] lines =
                responseText.split("\\R");

        for (String line : lines) {

            String cleaned =
                    line.trim()
                            .replaceFirst(
                                    "^\\d+[.)]\\s*",
                                    ""
                            );

            if (!cleaned.isEmpty()) {
                questions.add(cleaned);
            }
        }

        if (questions.size() > 5) {

            questions =
                    new ArrayList<>(
                            questions.subList(0, 5)
                    );
        }

        return questions;
    }

    public String generateFinalFeedback(
            String problemDescription,
            String concept,
            List<UnderstandingEvaluation> evaluations
    ) {

        StringBuilder evaluationText =
                new StringBuilder();

        for (int i = 0; i < evaluations.size(); i++) {

            UnderstandingEvaluation evaluation =
                    evaluations.get(i);

            evaluationText.append(
                            "Question "
                    ).append(i + 1)
                    .append(":\n");

            evaluationText.append(
                    "Understanding Level: "
            ).append(
                    evaluation.getUnderstandingLevel()
            ).append("\n");

            evaluationText.append(
                    "Concept: "
            ).append(
                    evaluation.getConcept()
            ).append("\n");

            evaluationText.append(
                    "Evaluation Feedback: "
            ).append(
                    evaluation.getFeedback()
            ).append("\n\n");
        }

        String prompt = """
            You are an educational mentor for a coding
            learning platform.

            A student solved a coding problem and then
            completed a conceptual understanding quiz.

            Your task is to generate FINAL learning feedback
            based on the student's complete quiz performance.

            Problem:
            %s

            Main concept:
            %s

            Individual evaluation results:
            %s

            Generate concise and useful educational feedback.

            Your response MUST contain these sections:

            Overall Understanding:
            Give a short assessment of what the student
            demonstrated across the quiz.

            What You Understand Well:
            Mention the concepts or reasoning areas
            the student demonstrated well.

            What You Should Improve:
            Mention the conceptual gaps that should be
            revisited.

            Recommended Focus:
            Give 2 or 3 concrete things the student should
            study or practice next.

            Keep the feedback encouraging and educational.

            Do not mention Gemini.
            Do not mention internal evaluation levels
            such as GOOD, PARTIAL, or POOR.
            Do not expose individual question evaluations.
            """.formatted(
                problemDescription,
                concept,
                evaluationText
        );

        return generateWithRetry(prompt).text();
    }


}

