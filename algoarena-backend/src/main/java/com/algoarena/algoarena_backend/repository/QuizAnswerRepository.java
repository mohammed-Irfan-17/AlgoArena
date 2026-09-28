package com.algoarena.algoarena_backend.repository;

import com.algoarena.algoarena_backend.entity.QuizAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizAnswerRepository
        extends JpaRepository<QuizAnswer, Long> {

    List<QuizAnswer> findBySubmissionId(Long submissionId);

    List<QuizAnswer> findByUserId(Long userId);

}

