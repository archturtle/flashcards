package com.flashcards.backend.persistence;

import com.flashcards.backend.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserDAO extends MongoRepository<User, String> {
    User findUserByEmail(String email);
}