package com.algoarena.algoarena_backend.dto;

import java.util.List;

public class FinalFeedbackResponse {

    private Long submissionId;

    private String feedback;

    private String approach;

    private String technique;

    private String timeComplexity;

    private String spaceComplexity;

    private String strengths;

    private String improvementOpportunity;

    private String optimalApproach;

    private String optimalTimeComplexity;

    private String optimalSpaceComplexity;

    private String overallUnderstanding;

    private List<String> whatYouUnderstand;

    private List<String> whatYouShouldImprove;

    private String keyTakeaway;

    private String nextFocus;


    public FinalFeedbackResponse() {
    }


    public FinalFeedbackResponse(
            Long submissionId,
            String feedback,
            String approach,
            String technique,
            String timeComplexity,
            String spaceComplexity,
            String strengths,
            String improvementOpportunity,
            String optimalApproach,
            String optimalTimeComplexity,
            String optimalSpaceComplexity,
            String overallUnderstanding,
            List<String> whatYouUnderstand,
            List<String> whatYouShouldImprove,
            String keyTakeaway,
            String nextFocus
    ) {

        this.submissionId = submissionId;
        this.feedback = feedback;
        this.approach = approach;
        this.technique = technique;
        this.timeComplexity = timeComplexity;
        this.spaceComplexity = spaceComplexity;
        this.strengths = strengths;
        this.improvementOpportunity = improvementOpportunity;
        this.optimalApproach = optimalApproach;
        this.optimalTimeComplexity = optimalTimeComplexity;
        this.optimalSpaceComplexity = optimalSpaceComplexity;
        this.overallUnderstanding = overallUnderstanding;
        this.whatYouUnderstand = whatYouUnderstand;
        this.whatYouShouldImprove = whatYouShouldImprove;
        this.keyTakeaway = keyTakeaway;
        this.nextFocus = nextFocus;
    }




    public Long getSubmissionId() {
        return submissionId;
    }

    public void setSubmissionId(Long submissionId) {
        this.submissionId = submissionId;
    }


    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }


    public String getApproach() {
        return approach;
    }

    public void setApproach(String approach) {
        this.approach = approach;
    }


    public String getTechnique() {
        return technique;
    }

    public void setTechnique(String technique) {
        this.technique = technique;
    }


    public String getTimeComplexity() {
        return timeComplexity;
    }

    public void setTimeComplexity(String timeComplexity) {
        this.timeComplexity = timeComplexity;
    }


    public String getSpaceComplexity() {
        return spaceComplexity;
    }

    public void setSpaceComplexity(String spaceComplexity) {
        this.spaceComplexity = spaceComplexity;
    }


    public String getStrengths() {
        return strengths;
    }

    public void setStrengths(String strengths) {
        this.strengths = strengths;
    }


    public String getImprovementOpportunity() {
        return improvementOpportunity;
    }

    public void setImprovementOpportunity(
            String improvementOpportunity
    ) {
        this.improvementOpportunity =
                improvementOpportunity;
    }


    public String getOptimalApproach() {
        return optimalApproach;
    }

    public void setOptimalApproach(String optimalApproach) {
        this.optimalApproach = optimalApproach;
    }


    public String getOptimalTimeComplexity() {
        return optimalTimeComplexity;
    }

    public void setOptimalTimeComplexity(
            String optimalTimeComplexity
    ) {
        this.optimalTimeComplexity =
                optimalTimeComplexity;
    }


    public String getOptimalSpaceComplexity() {
        return optimalSpaceComplexity;
    }

    public void setOptimalSpaceComplexity(
            String optimalSpaceComplexity
    ) {
        this.optimalSpaceComplexity =
                optimalSpaceComplexity;
    }


    public String getOverallUnderstanding() {
        return overallUnderstanding;
    }

    public void setOverallUnderstanding(
            String overallUnderstanding
    ) {
        this.overallUnderstanding =
                overallUnderstanding;
    }


    public List<String> getWhatYouUnderstand() {
        return whatYouUnderstand;
    }

    public void setWhatYouUnderstand(
            List<String> whatYouUnderstand
    ) {
        this.whatYouUnderstand =
                whatYouUnderstand;
    }


    public List<String> getWhatYouShouldImprove() {
        return whatYouShouldImprove;
    }

    public void setWhatYouShouldImprove(
            List<String> whatYouShouldImprove
    ) {
        this.whatYouShouldImprove =
                whatYouShouldImprove;
    }


    public String getKeyTakeaway() {
        return keyTakeaway;
    }

    public void setKeyTakeaway(String keyTakeaway) {
        this.keyTakeaway = keyTakeaway;
    }


    public String getNextFocus() {
        return nextFocus;
    }

    public void setNextFocus(String nextFocus) {
        this.nextFocus = nextFocus;
    }
}