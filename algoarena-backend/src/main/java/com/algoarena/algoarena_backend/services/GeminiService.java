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

    private GenerateContentResponse generateWithRetry(String prompt) {

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

    /*
     * ---------------------------------------------------------
     * CODE ANALYSIS
     * ---------------------------------------------------------
     */

    public CodeAnalysisResult analyzeCode(
            String problemDescription,
            String concept,
            String code,
            String language
    ) {

        String prompt = """
                You are a senior coding mentor analyzing a student's
                submitted solution for a coding learning platform.

                Analyze the student's ACTUAL CODE.

                Problem:
                %s

                Main concept:
                %s

                Programming language:
                %s

                Student code:
                %s

                Determine the actual approach used by the student.

                IMPORTANT:
                - Do NOT assume the student used the optimal approach.
                - Analyze the code that is actually provided.
                - Identify nested loops, hash maps, recursion,
                  sorting, two pointers, binary search, etc. when present.
                - Estimate realistic time and space complexity.
                - Identify what the student's approach does well.
                - Identify the most important improvement opportunity.
                - Identify an appropriate optimal or more efficient
                  approach when one exists.

                Return ONLY valid JSON.
                Do not use markdown.
                Do not use ```.

                JSON format:

                {
                  "approach": "Brute Force",
                  "technique": "Nested Loops",
                  "timeComplexity": "O(n^2)",
                  "spaceComplexity": "O(1)",
                  "strengths": "Correctly checks every possible pair.",
                  "improvementOpportunity": "Nested loops repeatedly compare elements.",
                  "optimalApproach": "Hash Map",
                  "optimalTimeComplexity": "O(n)"
                }

                Be conservative.
                Do not invent techniques that are not present in the code.
                """.formatted(
                problemDescription,
                concept,
                language,
                code
        );

        GenerateContentResponse response =
                generateWithRetry(prompt);

        String json = response.text();

        try {

            JsonNode root =
                    objectMapper.readTree(json);

            return new CodeAnalysisResult(
                    root.path("approach").asText(),
                    root.path("technique").asText(),
                    root.path("timeComplexity").asText(),
                    root.path("spaceComplexity").asText(),
                    root.path("strengths").asText(),
                    root.path("improvementOpportunity").asText(),
                    root.path("optimalApproach").asText(),
                    root.path("optimalTimeComplexity").asText()
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Could not parse Gemini code analysis: " + json,
                    e
            );
        }
    }

    /*
     * ---------------------------------------------------------
     * INDIVIDUAL ANSWER EVALUATION
     * ---------------------------------------------------------
     */

    public GeminiEvaluationResult evaluateAnswer(
            String problemDescription,
            String concept,
            String question,
            String studentAnswer,
            String studentCode,
            CodeAnalysisResult codeAnalysis
    ) {

        String prompt = """
                You are an educational evaluator for a coding platform.

                Evaluate the student's conceptual understanding based on:

                1. The problem
                2. The student's actual submitted code
                3. The approach detected in that code
                4. The question
                5. The student's answer

                Problem:
                %s

                Main concept:
                %s

                Student programming language/code:
                %s

                Detected student approach:
                %s

                Detected technique:
                %s

                Detected time complexity:
                %s

                Detected space complexity:
                %s

                Improvement opportunity:
                %s

                Question:
                %s

                Student answer:
                %s

                IMPORTANT:
                The evaluation MUST relate to the student's actual approach.

                If the student used brute force, evaluate their
                understanding of the brute-force approach and whether
                they understand its limitations.

                If the student used HashMap, evaluate their understanding
                of the HashMap approach.

                Do not assume the student used an algorithm that is not
                present in their code.

                Return ONLY valid JSON.
                Do not use markdown.
                Do not use ```.

                JSON format:

                {
                  "understandingLevel": "GOOD",
                  "concept": "Brute Force",
                  "feedback": "Short feedback directly related to the student's approach and answer."
                }

                understandingLevel must be exactly one of:
                GOOD
                PARTIAL
                POOR

                GOOD:
                The student clearly understands the relevant concept
                and their actual approach.

                PARTIAL:
                The student understands some important parts but has
                a meaningful conceptual gap.

                POOR:
                The answer shows little understanding or contains
                major conceptual errors.

                Focus on conceptual understanding, reasoning,
                complexity and the actual approach.
                """.formatted(
                problemDescription,
                concept,
                studentCode,
                codeAnalysis.getApproach(),
                codeAnalysis.getTechnique(),
                codeAnalysis.getTimeComplexity(),
                codeAnalysis.getSpaceComplexity(),
                codeAnalysis.getImprovementOpportunity(),
                question,
                studentAnswer
        );

        GenerateContentResponse response =
                generateWithRetry(prompt);

        String json = response.text();

        try {

            JsonNode root =
                    objectMapper.readTree(json);

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

    /*
     * ---------------------------------------------------------
     * QUIZ GENERATION
     * ---------------------------------------------------------
     */

    public List<String> generateQuizQuestions(
            String problemDescription,
            String concept,
            String studentCode,
            String language,
            CodeAnalysisResult codeAnalysis
    ) {

        String prompt = """
                You are creating a short conceptual understanding quiz
                for a coding learner.

                Problem:
                %s

                Main concept:
                %s

                Programming language:
                %s

                Student's actual code:
                %s

                Student's detected approach:
                %s

                Technique:
                %s

                Time complexity:
                %s

                Space complexity:
                %s

                Improvement opportunity:
                %s

                More efficient approach, when applicable:
                %s

                Generate exactly 5 questions.

                CRITICAL:
                The questions must be related to the student's ACTUAL
                implementation.

                Do NOT assume the student used the optimal approach.

                The questions should progressively explore:

                1. Understanding of the student's actual approach
                2. Why the student's approach works
                3. Time or space complexity of the student's approach
                4. Limitation or improvement opportunity
                5. How a better approach could improve the solution

                Example:

                If the student used nested loops for Two Sum,
                ask about O(n^2), repeated comparisons, and how
                HashMap could improve the solution.

                If the student used HashMap, ask about complement
                lookup, O(n) complexity, space usage, and ordering.

                Questions must test understanding, not code syntax.

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
                concept,
                language,
                studentCode,
                codeAnalysis.getApproach(),
                codeAnalysis.getTechnique(),
                codeAnalysis.getTimeComplexity(),
                codeAnalysis.getSpaceComplexity(),
                codeAnalysis.getImprovementOpportunity(),
                codeAnalysis.getOptimalApproach()
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

    /*
     * ---------------------------------------------------------
     * FINAL FEEDBACK
     * ---------------------------------------------------------
     */

    public String generateFinalFeedback(
            String problemDescription,
            String concept,
            String studentCode,
            CodeAnalysisResult codeAnalysis,
            List<UnderstandingEvaluation> evaluations
    ) {

        StringBuilder evaluationText =
                new StringBuilder();

        for (int i = 0; i < evaluations.size(); i++) {

            UnderstandingEvaluation evaluation =
                    evaluations.get(i);

            evaluationText.append(
                            "Question "
                    )
                    .append(i + 1)
                    .append(":\n");

            evaluationText.append(
                            "Understanding Level: "
                    )
                    .append(
                            evaluation.getUnderstandingLevel()
                    )
                    .append("\n");

            evaluationText.append(
                            "Concept: "
                    )
                    .append(
                            evaluation.getConcept()
                    )
                    .append("\n");

            evaluationText.append(
                            "Evaluation Feedback: "
                    )
                    .append(
                            evaluation.getFeedback()
                    )
                    .append("\n\n");
        }

        String prompt = """
                You are an educational mentor for a coding
                learning platform.

                Generate final learning feedback based on the
                student's ACTUAL CODE and their conceptual quiz.

                Problem:
                %s

                Main concept:
                %s

                Student code:
                %s

                Student approach:
                %s

                Technique:
                %s

                Time complexity:
                %s

                Space complexity:
                %s

                What the approach does well:
                %s

                Improvement opportunity:
                %s

                More efficient approach:
                %s

                Individual quiz evaluation results:
                %s

                Your feedback MUST be about the student's actual
                implementation.

                If the student used brute force, do not claim that
                they used HashMap.

                If the student used HashMap, discuss their HashMap
                implementation specifically.

                Generate concise educational feedback.

                Return ONLY valid JSON.
                Do not use markdown.
                Do not use ```.

                JSON format:

                {
                  "overallUnderstanding": "Short assessment of the student's actual approach.",
                  "whatYouUnderstand": [
                    "Point 1",
                    "Point 2",
                    "Point 3"
                  ],
                  "whatToImprove": [
                    "Point 1",
                    "Point 2"
                  ],
                  "keyTakeaway": "One important learning takeaway.",
                  "nextFocus": "The most useful next concept to practice."
                }

                Keep each point concise.
                Do not mention Gemini.
                Do not mention internal evaluation levels such
                as GOOD, PARTIAL, or POOR inside the text.
                """.formatted(
                problemDescription,
                concept,
                studentCode,
                codeAnalysis.getApproach(),
                codeAnalysis.getTechnique(),
                codeAnalysis.getTimeComplexity(),
                codeAnalysis.getSpaceComplexity(),
                codeAnalysis.getStrengths(),
                codeAnalysis.getImprovementOpportunity(),
                codeAnalysis.getOptimalApproach(),
                evaluationText
        );

        return generateWithRetry(prompt).text();
    }
}