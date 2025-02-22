package com.flashcards.backend.persistence;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.flashcards.backend.model.Card;
import java.util.ArrayList;

public interface CardDAO extends MongoRepository<Card, String> {
    public ObjectId createCard(Card card);
    public Card findCardById(String cardId);
    public boolean deleteCard(ObjectId cardId);
    public ArrayList<Card> findCardsBy(ArrayList<String> Ids);
    public Card updateCard(Card card);
}