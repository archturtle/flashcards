package com.flashcards.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;

@Data
public class Deck {
    @Id
    public ObjectId id;
    public String name;
    public ObjectId owner;
    public ArrayList<ObjectId> cards;

    public Deck(String name, ObjectId owner, ArrayList<ObjectId> cards) {
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