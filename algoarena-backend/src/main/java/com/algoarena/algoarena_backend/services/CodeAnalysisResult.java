package com.algoarena.algoarena_backend.services;

public class CodeAnalysisResult {

    private String approach;
    private String technique;
    private String timeComplexity;
    private String spaceComplexity;
    private String strengths;
    private String improvementOpportunity;
    private String optimalApproach;
    private String optimalTimeComplexity;
    private String optimalSpaceComplexity;

    public CodeAnalysisResult() {
    }

    public CodeAnalysisResult(
            String approach,
            String technique,
            String timeComplexity,
            String spaceComplexity,
            String strengths,
            String improvementOpportunity,
            String optimalApproach,
            String optimalTimeComplexity,
            String optimalSpaceComplexity
    ) {
        this.approach = approach;
        this.technique = technique;
        this.timeComplexity = timeComplexity;
        this.spaceComplexity = spaceComplexity;
        this.strengths = strengths;
        this.improvementOpportunity = improvementOpportunity;
        this.optimalApproach = optimalApproach;
        this.optimalTimeComplexity = optimalTimeComplexity;
        this.optimalSpaceComplexity = optimalSpaceComplexity;
    }

    public String getApproach() {
        return approach;
    }

    public String getTechnique() {
        return technique;
    }

    public String getTimeComplexity() {
        return timeComplexity;
    }

    public String getSpaceComplexity() {
        return spaceComplexity;
    }

    public String getStrengths() {
        return strengths;
    }

    public String getImprovementOpportunity() {
        return improvementOpportunity;
    }

    public String getOptimalApproach() {
        return optimalApproach;
    }

    public String getOptimalTimeComplexity() {
        return optimalTimeComplexity;
    }

    public String getOptimalSpaceComplexity() {
        return optimalSpaceComplexity;
    }
}