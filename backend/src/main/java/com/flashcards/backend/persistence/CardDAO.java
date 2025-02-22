package com.flashcards.backend.persistence;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.flashcards.backend.model.Card;
import java.util.ArrayList;

public interface CardDAO extends MongoRepository<Card, String> {
    Card findCardById(String cardId);
    ArrayList<Card> findCardsBy(ArrayList<String> Ids);
}