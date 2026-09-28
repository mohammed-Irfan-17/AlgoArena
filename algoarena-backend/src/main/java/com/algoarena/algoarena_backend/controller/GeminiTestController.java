package com.algoarena.algoarena_backend.controller;

import com.algoarena.algoarena_backend.services.GeminiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gemini")
public class GeminiTestController {

    private final GeminiService geminiService;

    public GeminiTestController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @GetMapping("/test")
    public String testGemini() {

        return geminiService.testGemini(
                "Explain HashMap in Java in two simple sentences."
        );
    }
}

