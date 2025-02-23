package com.flashcards.backend.persistence;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.flashcards.backend.model.Card;

public interface CardDAO extends MongoRepository<Card, String> {
}