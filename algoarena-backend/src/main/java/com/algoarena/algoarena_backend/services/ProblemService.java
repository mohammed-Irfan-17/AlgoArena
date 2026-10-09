package com.algoarena.algoarena_backend.services;

import com.algoarena.algoarena_backend.entity.Problem;
import com.algoarena.algoarena_backend.repository.ProblemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemService {

    private final ProblemRepository problemRepository;

    private volatile List<Problem> cachedProblems;

    public ProblemService(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    public Problem createProblem(Problem problem) {
        Problem savedProblem = problemRepository.save(problem);

        // Refresh cache after creating a new problem
        cachedProblems = problemRepository.findAll();

        return savedProblem;
    }

    public List<Problem> getAllProblems() {

        // Return cached problems if already loaded
        if (cachedProblems != null) {
            return cachedProblems;
        }

        // Load from database only once
        synchronized (this) {
            if (cachedProblems == null) {
                cachedProblems = problemRepository.findAll();
            }
        }

        return cachedProblems;
    }

    public Problem getProblemById(Long id) {
        return problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found"));
    }
}