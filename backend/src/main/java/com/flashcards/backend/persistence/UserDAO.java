package com.flashcards.backend.persistence;

import com.flashcards.backend.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserDAO extends MongoRepository<User, String> {
    public ObjectId createUser(User user);
    public User findUserByEmail(String email);
}