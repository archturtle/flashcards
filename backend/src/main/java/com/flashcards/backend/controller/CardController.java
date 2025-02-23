package com.flashcards.backend.controller;

import com.flashcards.backend.model.Card;
import com.flashcards.backend.persistence.CardDAO;
import org.springframework.boot.logging.LogLevel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import java.io.IOException;
import java.lang.reflect.Array;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("card")
public class CardController {
    private static final Logger LOG = Logger.getLogger(CardController.class.getName());
    private CardDAO cardDAO;

    public CardController(CardDAO cardDAO) {
        this.cardDAO = cardDAO;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ArrayList<Card>> getCardById(@PathVariable String id) {
        LOG.log(Level.INFO, "GET /get/{0}", id);

        try {
            ArrayList<String> ids = new ArrayList<>(Arrays.asList(id.split(",")));
            ArrayList<Card> cards = new ArrayList<>(cardDAO.findAllById(ids));
            if (!cards.isEmpty()) {
                return new ResponseEntity<>(cards, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Card> createCard(@Valid @RequestBody Card card) {
        LOG.log(Level.INFO, "POST /create {0}", card);

        try {
            card.setId(null);
            Card new_deck = cardDAO.save(card);
            return new ResponseEntity<>(new_deck, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create-many")
    public ResponseEntity<ArrayList<Card>> createCards(@Valid @RequestBody ArrayList<Card> cards) {
        LOG.log(Level.INFO, "POST /create-many {0}", cards);

        try {
            for (Card card: cards) {
                card.setId(null);
            }

            ArrayList<Card> allCards = new ArrayList<>(cardDAO.saveAll(cards));
            return new ResponseEntity<>(allCards, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<Card> deleteCard(@PathVariable String id) {
        LOG.log(Level.INFO, "POST /delete/{0}", id);

        try {
            if (cardDAO.findById(id).isPresent()) {
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
    public ResponseEntity<Card> updateCard(@Valid @RequestBody Card card) {
        LOG.log(Level.INFO, "POST /update/{0}", card);

        try {
            if (cardDAO.findById(card.getId()).isPresent()) {
                Card updated_card = cardDAO.save(card);
                return new ResponseEntity<>(updated_card, HttpStatus.CREATED);

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
        LOG.log(Level.INFO, "POST /generate", file);

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




