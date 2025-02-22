package com.flashcards.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@Document("deck")
public class Deck {
    @Id
    public String id;
    public String name;
    public String owner;
    public ArrayList<String> cards;

    public Deck(String id, String name, String owner, ArrayList<String> cards) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.cards = cards;
    }

    @Override
    public String toString() {
        return String.format(
                "Deck[id=%s, name='%s', owner=%s, cards=%s]",
                id.toString(), name, owner.toString(), cards.toString()
        );
    }
}