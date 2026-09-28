package com.algoarena.algoarena_backend.repository;


import com.algoarena.algoarena_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}


