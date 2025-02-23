package com.flashcards.backend.persistence;

import com.flashcards.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserDAO extends MongoRepository<User, String> {
    Optional<User> findUserBySubject(String subject);
}