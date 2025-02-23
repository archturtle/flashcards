package com.flashcards.backend.persistence;

public interface CardDAOCustom {
    boolean cardBelongsToDeckOwnedBy(String cardId, String ownedId);
}
