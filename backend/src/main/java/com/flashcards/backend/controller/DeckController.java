package com.flashcards.backend.controller;

import com.flashcards.backend.model.Deck;
import com.flashcards.backend.persistence.DeckDAO;
import com.flashcards.backend.persistence.UserDAO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("deck")
public class DeckController {
    private static final Logger LOG = Logger.getLogger(DeckController.class.getName());
    private DeckDAO deckDAO;
    private UserDAO userDAO;

    public DeckController(DeckDAO deckDAO, UserDAO userDAO) {
        this.deckDAO = deckDAO;
        this.userDAO = userDAO;
    }

    @PostMapping("create")
    public ResponseEntity<Deck> createDeck(@RequestBody Deck deck) {
        LOG.log(Level.INFO, "POST /deck/create {0}", deck);

        try {
            if (deckDAO.findById(deck.getId()).isEmpty()) {
                Deck new_deck = deckDAO.save(deck);
                return new ResponseEntity<>(new_deck, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        } catch (Exception e) {
            LOG.log(Level.SEVERE, e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("delete/{deckId}")
    public ResponseEntity<String> deleteDeck(@PathVariable String deckId) {
        LOG.log(Level.INFO, "POST /deck/delete/{0}", deckId);

        try {
            if (deckDAO.findById(deckId).isPresent()) {
                deckDAO.deleteById(deckId);
                return new ResponseEntity<>(deckId, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            LOG.log(Level.SEVERE, e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("update")
    public ResponseEntity<Deck> updateDeck(@RequestBody Deck deck) {
        LOG.log(Level.INFO, "POST /deck/update {0}", deck);

        try {
            if (deckDAO.findById(deck.getId()).isPresent()) {
                Deck updated_deck = deckDAO.save(deck);
                return new ResponseEntity<>(updated_deck, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            LOG.log(Level.SEVERE, e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("fetch/{email}")
    public ResponseEntity<ArrayList<Deck>> fetchDecks(@PathVariable String email) {
        LOG.log(Level.INFO, "POST /deck/fetch/{0}", email);

        try {
            if (userDAO.findUserByEmail(email).isPresent()) {
                ArrayList<Deck> decks = deckDAO.findDecksByOwner(email);
                return new ResponseEntity<>(decks, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            LOG.log(Level.SEVERE, e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}