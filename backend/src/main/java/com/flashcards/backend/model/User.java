package com.flashcards.backend.model;
import org.springframework.data.annotation.Id;

import lombok.Data;
@Data

public class User {
    @Id
    public String id;
    public String firstName;
    public String lastName;
    public String email;
    public User (String firstName, String lastName, String email) {
            this.firstName = firstName; 
            this.lastName = lastName;
            this.email = email;
    }

    public void toString (Card card) {
        System.out.print("User ID " + this.id);
        System.out.println("First Name: " + this.firstName);
        System.out.println("Last Name: " + this.lastName);

    }
}