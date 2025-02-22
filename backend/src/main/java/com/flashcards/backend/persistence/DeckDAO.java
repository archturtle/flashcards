package com.flashcards.backend.persistence;

import com.flashcards.backend.model.Deck;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.ArrayList;

public interface DeckDAO extends MongoRepository<Deck, String> {
    public Deck findDeckById(String id);
    public boolean deleteDeckById(String id);
    public Deck updateDeck(Deck deck);
    public ArrayList<Deck> findDecksByOwnerId(String ownerId);
}