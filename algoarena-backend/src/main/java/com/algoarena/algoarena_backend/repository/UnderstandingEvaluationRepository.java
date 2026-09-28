package com.algoarena.algoarena_backend.repository;

import com.algoarena.algoarena_backend.entity.UnderstandingEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UnderstandingEvaluationRepository
        extends JpaRepository<UnderstandingEvaluation, Long> {

    List<UnderstandingEvaluation> findBySubmissionId(
            Long submissionId
    );

    List<UnderstandingEvaluation> findByUserIdOrderByIdAsc(Long userId);
    boolean existsByAnswerId(Long answerId);

    Optional<UnderstandingEvaluation> findByAnswerId(Long answerId);
}
