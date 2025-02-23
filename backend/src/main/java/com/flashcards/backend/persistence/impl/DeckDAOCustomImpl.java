package com.flashcards.backend.persistence.impl;

import com.flashcards.backend.model.Deck;
import com.flashcards.backend.persistence.DeckDAOCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class DeckDAOCustomImpl implements DeckDAOCustom {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public boolean deckIsOwnedBy(String deckId, String ownedId) {
        Query deckQuery = new Query(Criteria.where("id").is(deckId).and("owner").is(ownedId));
        return mongoTemplate.exists(deckQuery, Deck.class);
    }
}
