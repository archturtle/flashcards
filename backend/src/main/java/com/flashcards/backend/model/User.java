package com.flashcards.backend.model;

import org.springframework.data.annotation.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("user")
public class User {
    @Id
    public String id;
    public String firstName;
    public String lastName;
    public String email;

    public User (String id, String firstName, String lastName, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public String toString() {
        return String.format(
                "User ID: %s\nFirst Name: %s\nLast Name: %s\nEmail: %s\n",
                id, firstName, lastName
        );
    }
}