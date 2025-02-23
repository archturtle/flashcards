package com.flashcards.backend.model;

import jakarta.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document("deck")
public class Deck {
    @Id @NotNull
    private String id;
    @NotBlank
    private String name;
    @NotBlank
    private String owner;

    public Deck(String id, String name, String owner) {
        this.id = id;
        this.name = name;
        this.owner = owner;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    @Override
    public String toString() {
        return String.format(
                "Deck[id=%s, name='%s', owner=%s]",
                id, name, owner
        );
    }
}