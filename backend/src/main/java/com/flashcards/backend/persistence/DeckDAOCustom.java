package com.flashcards.backend.persistence;

public interface DeckDAOCustom {
    boolean deckIsOwnedBy(String deckId, String ownedId);
}
