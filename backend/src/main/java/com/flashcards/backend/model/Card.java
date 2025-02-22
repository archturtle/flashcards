package com.flashcards.backend.model;

import org.springframework.data.annotation.Id;
import lombok.Data;

@Data
public class Card {
    @Id
    public String id;
    public String front;
    public String back;

    public Card (String front, String back) {
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