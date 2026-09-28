package com.algoarena.algoarena_backend.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.errors.ServerException;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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
}

