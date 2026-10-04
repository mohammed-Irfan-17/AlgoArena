
        package com.algoarena.algoarena_backend.services;

import com.algoarena.algoarena_backend.dto.*;
import com.algoarena.algoarena_backend.entity.Problem;
import com.algoarena.algoarena_backend.entity.Submission;
import com.algoarena.algoarena_backend.repository.ProblemRepository;
import com.algoarena.algoarena_backend.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class DashboardService {

    private final ProblemRepository problemRepository;

    private final SubmissionRepository submissionRepository;

    private final UnderstandingEvaluationService
            understandingEvaluationService;


    public DashboardService(
            ProblemRepository problemRepository,
            SubmissionRepository submissionRepository,
            UnderstandingEvaluationService
                    understandingEvaluationService
    ) {
        this.problemRepository = problemRepository;

        this.submissionRepository = submissionRepository;

        this.understandingEvaluationService =
                understandingEvaluationService;
    }


    /*
     * =========================================================
     * MAIN DASHBOARD
     * =========================================================
     */

    public FinalDashboardResponse getDashboard(
            Long userId
    ) {

        /*
         * -----------------------------------------
         * 1. GET ALL PROBLEMS
         * -----------------------------------------
         */

        List<Problem> allProblems =
                problemRepository.findAll();


        /*
         * -----------------------------------------
         * 2. GET USER SUBMISSIONS
         * -----------------------------------------
         */

        List<Submission> submissions =
                submissionRepository.findByUserId(userId);


        /*
         * -----------------------------------------
         * 3. FIND ACCEPTED PROBLEMS
         * -----------------------------------------
         *
         * Distinct problem IDs are used.
         *
         * Multiple accepted submissions for the
         * same problem still count as ONE solved
         * question.
         */

        Set<Long> solvedProblemIds =
                new HashSet<>();


        for (Submission submission : submissions) {

            if (
                    submission.getStatus() != null
                            &&
                            "ACCEPTED".equalsIgnoreCase(
                                    submission.getStatus()
                            )
            ) {

                solvedProblemIds.add(
                        submission.getProblemId()
                );
            }
        }


        /*
         * -----------------------------------------
         * 4. OVERALL PROGRESS
         * -----------------------------------------
         */

        int totalQuestions =
                allProblems.size();

        int solvedQuestions =
                solvedProblemIds.size();


        /*
         * -----------------------------------------
         * 5. CONCEPT PROGRESS
         * -----------------------------------------
         */

        Map<String, Integer>
                totalByConcept =
                new HashMap<>();

        Map<String, Set<Long>>
                solvedByConcept =
                new HashMap<>();


        for (Problem problem : allProblems) {

            String concept =
                    problem.getConcept();


            if (concept == null ||
                    concept.isBlank()) {

                continue;
            }


            String normalizedConcept =
                    concept.trim();


            /*
             * Total questions in this concept
             */

            totalByConcept.put(
                    normalizedConcept,
                    totalByConcept.getOrDefault(
                            normalizedConcept,
                            0
                    ) + 1
            );


            /*
             * Is this problem solved?
             */

            if (
                    solvedProblemIds.contains(
                            problem.getId()
                    )
            ) {

                solvedByConcept
                        .computeIfAbsent(
                                normalizedConcept,
                                key -> new HashSet<>()
                        )
                        .add(
                                problem.getId()
                        );
            }
        }


        /*
         * -----------------------------------------
         * 6. UNDERSTANDING STATUS
         * -----------------------------------------
         *
         * The understanding engine determines
         * whether the user has demonstrated
         * conceptual understanding.
         */

        List<ConceptStatusResponse>
                existingStatuses =
                understandingEvaluationService
                        .getConceptStatuses(userId);


        Map<String, String>
                statusByConcept =
                new HashMap<>();


        for (
                ConceptStatusResponse status
                : existingStatuses
        ) {

            if (status.getConcept() == null) {
                continue;
            }

            statusByConcept.put(
                    status.getConcept()
                            .trim()
                            .toLowerCase(),
                    status.getStatus()
            );
        }


        /*
         * -----------------------------------------
         * 7. BUILD FINAL CONCEPT PROGRESS
         * -----------------------------------------
         */

        List<
                DashboardConceptProgressResponse
                > progress =
                new ArrayList<>();


        for (
                Map.Entry<String, Integer> entry
                : totalByConcept.entrySet()
        ) {

            String concept =
                    entry.getKey();

            int total =
                    entry.getValue();


            int solved =
                    solvedByConcept
                            .getOrDefault(
                                    concept,
                                    Set.of()
                            )
                            .size();


            double percentage =
                    total == 0
                            ? 0.0
                            : (
                            (double) solved
                                    / total
                    ) * 100.0;


            String evaluationStatus =
                    statusByConcept.get(
                            concept.toLowerCase()
                    );


            String dashboardStatus =
                    convertStatus(
                            evaluationStatus,
                            solved
                    );


            progress.add(
                    new DashboardConceptProgressResponse(
                            concept,
                            solved,
                            total,
                            Math.round(
                                    percentage * 10.0
                            ) / 10.0,
                            dashboardStatus
                    )
            );
        }


        /*
         * Stable ordering:
         * highest percentage first.
         */

        progress.sort(
                (a, b) ->
                        Double.compare(
                                b.getPercentage(),
                                a.getPercentage()
                        )
        );


        /*
         * -----------------------------------------
         * 8. RECOMMENDATIONS
         * -----------------------------------------
         */

        List<
                ConceptRecommendationResponse
                > recommendations =
                buildRecommendations(
                        allProblems,
                        solvedProblemIds,
                        progress
                );


        /*
         * -----------------------------------------
         * 9. RETURN DASHBOARD
         * -----------------------------------------
         */

        return new FinalDashboardResponse(
                solvedQuestions,
                totalQuestions,
                progress,
                convertConceptStatuses(
                        progress
                ),
                recommendations
        );
    }


    /*
     * =========================================================
     * STATUS
     * =========================================================
     */

    private String convertStatus(
            String evaluationStatus,
            int solvedQuestions
    ) {

        /*
         * No accepted problem and no evaluation.
         */

        if (
                solvedQuestions == 0
                        &&
                        evaluationStatus == null
        ) {

            return "NOT ATTEMPTED YET";
        }


        /*
         * Strong understanding.
         */

        if (
                evaluationStatus != null
                        &&
                        "GOOD".equalsIgnoreCase(
                                evaluationStatus
                        )
        ) {

            return "GOOD";
        }


        /*
         * Anything that has been practiced
         * but is not currently GOOD is shown
         * to the user as IMPROVING.
         */

        return "IMPROVING";
    }


    /*
     * =========================================================
     * CONCEPT STATUS LIST
     * =========================================================
     */

    private List<ConceptStatusResponse>
    convertConceptStatuses(
            List<
                    DashboardConceptProgressResponse
                    > progress
    ) {

        List<ConceptStatusResponse>
                statuses =
                new ArrayList<>();


        for (
                DashboardConceptProgressResponse
                        item
                : progress
        ) {

            statuses.add(
                    new ConceptStatusResponse(
                            item.getConcept(),
                            item.getStatus()
                    )
            );
        }


        return statuses;
    }


    /*
     * =========================================================
     * RECOMMENDATIONS
     * =========================================================
     */

    private List<
            ConceptRecommendationResponse
            > buildRecommendations(
            List<Problem> allProblems,
            Set<Long> solvedProblemIds,
            List<
                    DashboardConceptProgressResponse
                    > progress
    ) {

        List<
                ConceptRecommendationResponse
                > result =
                new ArrayList<>();


        /*
         * Only concepts that need improvement
         * receive recommendations.
         */

        for (
                DashboardConceptProgressResponse
                        conceptProgress
                : progress
        ) {

            if (
                    !"IMPROVING".equalsIgnoreCase(
                            conceptProgress.getStatus()
                    )
            ) {

                continue;
            }


            List<
                    ProblemRecommendationResponse
                    > problems =
                    new ArrayList<>();


            for (
                    Problem problem
                    : allProblems
            ) {

                if (
                        problem.getConcept() == null
                ) {
                    continue;
                }


                if (
                        !problem.getConcept()
                                .equalsIgnoreCase(
                                        conceptProgress
                                                .getConcept()
                                )
                ) {

                    continue;
                }


                /*
                 * Do not recommend a problem
                 * that the user has already solved.
                 */

                if (
                        solvedProblemIds.contains(
                                problem.getId()
                        )
                ) {

                    continue;
                }


                problems.add(
                        new ProblemRecommendationResponse(
                                problem.getId(),
                                problem.getTitle(),
                                problem.getDescription(),
                                problem.getConcept()
                        )
                );
            }


            /*
             * Keep recommendations useful.
             * Maximum 3 problems per concept.
             */

            if (problems.size() > 3) {

                problems =
                        new ArrayList<>(
                                problems.subList(
                                        0,
                                        3
                                )
                        );
            }


            if (!problems.isEmpty()) {

                result.add(
                        new ConceptRecommendationResponse(
                                conceptProgress.getConcept(),
                                problems
                        )
                );
            }
        }


        return result;
    }
}

