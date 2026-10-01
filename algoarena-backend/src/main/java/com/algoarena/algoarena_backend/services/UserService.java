package com.algoarena.algoarena_backend.services;

import com.algoarena.algoarena_backend.dto.LoginRequest;
import com.algoarena.algoarena_backend.dto.LoginResponse;
import com.algoarena.algoarena_backend.entity.User;
import com.algoarena.algoarena_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException(
                    "An account with this email already exists."
            );
        }

        return userRepository.save(user);
    }

    public LoginResponse login(
            LoginRequest request
    ) {

        User user =
                userRepository
                        .findByEmail(request.getEmail())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid email or password."
                                )
                        );

        if (!user.getPassword()
                .equals(request.getPassword())) {

            throw new RuntimeException(
                    "Invalid email or password."
            );
        }

        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }

    public User getUserById(Long userId) {

        return userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found."
                        )
                );
    }

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }
}