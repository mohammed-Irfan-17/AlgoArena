package com.algoarena.algoarena_backend.repository;

import com.algoarena.algoarena_backend.entity.FinalFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FinalFeedbackRepository
        extends JpaRepository<FinalFeedback, Long> {

    Optional<FinalFeedback> findBySubmissionId(
            Long submissionId
    );
}