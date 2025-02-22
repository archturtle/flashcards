package com.flashcards.backend.model;
import org.springframework.data.annotation.Id;

import lombok.Data;
@Data

public class User {
    @Id
    public String id;
    public String firstName;
    public String lastName;
    public User (String firstName, String lastName) {
            this.firstName = firstName; 
            this.lastName = lastName;  
    } 

}