package com.flashcards.backend.persistence;

import com.flashcards.backend.model.Card;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CardDAO extends MongoRepository<Card, String>, CardDAOCustom {
    List<Card> findCardsByDeckId(String deckId);
    List<Card> deleteCardsByDeckId(String deckId);
}