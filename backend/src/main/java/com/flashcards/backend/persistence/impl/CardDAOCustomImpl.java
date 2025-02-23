package com.flashcards.backend.persistence.impl;

import com.flashcards.backend.model.Card;
import com.flashcards.backend.model.Deck;
import com.flashcards.backend.persistence.CardDAOCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class CardDAOCustomImpl implements CardDAOCustom {
   @Autowired
   private MongoTemplate mongoTemplate;

    @Override
    public boolean cardBelongsToDeckOwnedBy(String cardId, String ownerId) {
        Query cardQuery = new Query(Criteria.where("id").is(cardId));
        Card card = mongoTemplate.findOne(cardQuery, Card.class);
        if (card == null) { return false; }

        Query deckQuery = new Query(Criteria.where("id").is(card.getDeckId()).and("owner").is(ownerId));
        return mongoTemplate.exists(deckQuery, Deck.class);
    }
}
