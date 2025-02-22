package com.flashcards.backend.model;
import org.bson.types.ObjectId;
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

    public void toString (Card card) {
        System.out.print("ID of the Card" + this.id);
        System.out.println("Front of the Card: " + this.front);
        System.out.println("Back of the Card: " + this.back);

    }



}