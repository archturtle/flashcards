package com.flashcards.backend.persistence;

import com.flashcards.backend.model.Deck;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.ArrayList;

public interface DeckDAO extends MongoRepository<Deck, String> {
    public Deck findDeckById(String Id);
    public ArrayList<Deck> findDecksByOwner(String owner);
}