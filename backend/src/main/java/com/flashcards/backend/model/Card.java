package com.flashcards.backend.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("card")
public class Card {
    @Id @NotNull
    private String id;
    @NotBlank
    private String front;
    @NotBlank
    private String back;
    @NotBlank
    private String deckId;

    public Card (String id, String front, String back, String deckId) {
        this.id = id;
        this.front = front;
        this.back = back;
        this.deckId = deckId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFront() {
        return front;
    }

    public void setFront(String front) {
        this.front = front;
    }

    public String getBack() {
        return back;
    }

    public void setBack(String back) {
        this.back = back;
    }

    public String getDeckId() {
        return deckId;
    }

    public void setDeckId(String deckId) {
        this.deckId = deckId;
    }

    public String toString() {
       return String.format(
               "ID: %s\nFront: %s\nBack: %s\nDeck ID: %s\n",
                id, front, back, deckId
       );
    }
}