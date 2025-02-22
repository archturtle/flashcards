package com.flashcards.backend.persistence;
import com.flashcards.backend.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.flashcards.backend.model.Card;

import java.util.ArrayList;

public interface UserDAO extends MongoRepository<Card, String> {

    public User createUser (User user);

    public User findUserByEmail (String email);
}