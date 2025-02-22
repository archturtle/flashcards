package com.flashcards.backend.persistence;

import com.flashcards.backend.model.Deck;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.ArrayList;

public interface DeckDAO extends MongoRepository<Deck, String> {
    Deck findDeckById(String Id);
    ArrayList<Deck> findDecksByOwner(String owner);
}