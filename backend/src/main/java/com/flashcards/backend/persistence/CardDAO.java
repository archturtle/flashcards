package com.flashcards.backend.persistence;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.flashcards.backend.model.Card;

import java.util.List;

public interface CardDAO extends MongoRepository<Card, String> {
    List<Card> findCardsByDeckId(String deckId);
    List<Card> deleteCardsByDeckId(String deckId);
}