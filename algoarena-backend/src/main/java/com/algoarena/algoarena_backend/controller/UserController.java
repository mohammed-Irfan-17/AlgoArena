package com.algoarena.algoarena_backend.controller;

import com.algoarena.algoarena_backend.dto.LoginRequest;
import com.algoarena.algoarena_backend.dto.LoginResponse;
import com.algoarena.algoarena_backend.entity.User;
import com.algoarena.algoarena_backend.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(
            UserService userService
    ) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(
            @RequestBody User user
    ) {

        return userService.createUser(user);
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request
    ) {

        return userService.login(request);
    }

    @GetMapping("/{userId}")
    public User getUser(
            @PathVariable Long userId
    ) {

        return userService.getUserById(userId);
    }

    @GetMapping
    public List<User> getAllUsers() {

        return userService.getAllUsers();
    }
}