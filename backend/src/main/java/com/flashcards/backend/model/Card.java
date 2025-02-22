package com.flashcards.backend.model;

import org.springframework.data.annotation.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("card")
public class Card {
    @Id
    public String id;
    public String front;
    public String back;

    public Card (String id, String front, String back) {
        this.id = id;
        this.front = front;
        this.back = back;
    }

    public String toString() {
       return String.format(
               "ID: %s\nFront: %s\nBack: %s\n",
                id, front, back
       );
    }
}