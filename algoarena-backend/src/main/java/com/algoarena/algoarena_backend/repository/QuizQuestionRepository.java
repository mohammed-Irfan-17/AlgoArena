
        package com.algoarena.algoarena_backend.repository;

import com.algoarena.algoarena_backend.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

        public interface QuizQuestionRepository
        extends JpaRepository<QuizQuestion, Long> {

    List<QuizQuestion> findBySubmissionId(Long submissionId);

    List<QuizQuestion> findByProblemId(Long problemId);
    Optional<QuizQuestion> findById(Long id);
}

