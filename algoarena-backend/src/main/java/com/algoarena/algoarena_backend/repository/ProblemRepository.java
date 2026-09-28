package com.algoarena.algoarena_backend.repository;

import com.algoarena.algoarena_backend.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Long> {


    List<Problem> findByConceptIgnoreCase(String concept);


}

