package com.flashcards.backend.controller;

import com.flashcards.backend.model.Card;
import com.flashcards.backend.persistence.CardDAO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("card")
public class CardController {
    private CardDAO cardDAO;

    public CardController(CardDAO cardDAO) {
        this.cardDAO = cardDAO;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Card> getCardById(@PathVariable String id) {
        Card card = cardDAO.findCardById(id);
        try {
            if (card != null)
                return new ResponseEntity<>(card, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/create")
    public ResponseEntity<Card> createCard(@RequestBody Card card) throws IOException {
        try {
                card.setId(null);
                Card this_card = cardDAO.save(card);
                return new ResponseEntity<>(this_card, HttpStatus.CREATED);


        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<Card> deleteCard(@PathVariable String id) throws IOException {
        try {
            if (cardDAO.findCardById(id) != null) {
                cardDAO.deleteById(id);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/update")
    public ResponseEntity<Card> updateCard(@RequestBody Card card) throws IOException {
        try {
            if (cardDAO.findCardById(card.getId()) != null) {
                Card this_card = cardDAO.save(card);
                return new ResponseEntity<>(this_card, HttpStatus.CREATED);

            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/generate")
    //This code is very shakey
    public ResponseEntity<String> generate(@RequestPart("file") MultipartFile file) {
        if (null == file.getOriginalFilename()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            byte[] bytes = file.getBytes();
            Path path = Paths.get(file.getOriginalFilename());
            Files.write(path, bytes);
            System.out.println(path.getFileName());
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
        return new ResponseEntity<>("Good Job", HttpStatus.OK);
    }
}




