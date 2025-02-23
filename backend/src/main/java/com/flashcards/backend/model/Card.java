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

    public Card (String id, String front, String back) {
        this.id = id;
        this.front = front;
        this.back = back;
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

    public String toString() {
       return String.format(
               "ID: %s\nFront: %s\nBack: %s\n",
                id, front, back
       );
    }
}