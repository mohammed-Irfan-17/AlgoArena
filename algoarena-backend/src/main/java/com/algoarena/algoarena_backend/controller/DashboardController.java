package com.algoarena.algoarena_backend.controller;

import com.algoarena.algoarena_backend.dto.FinalDashboardResponse;
import com.algoarena.algoarena_backend.services.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService
    ) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/user/{userId}")
    public FinalDashboardResponse getDashboard(
            @PathVariable Long userId
    ) {
        return dashboardService.getDashboard(userId);
    }
}

