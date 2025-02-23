package com.flashcards.backend.controller;

import com.auth0.jwt.JWT;
import com.flashcards.backend.model.Deck;
import com.flashcards.backend.persistence.CardDAO;
import com.flashcards.backend.persistence.DeckDAO;
import com.flashcards.backend.persistence.UserDAO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("deck")
public class DeckController {
    private static final Logger LOG = Logger.getLogger(DeckController.class.getName());
    private DeckDAO deckDAO;
    private UserDAO userDAO;
    private CardDAO cardDAO;

    public DeckController(DeckDAO deckDAO, UserDAO userDAO, CardDAO cardDAO) {
        this.deckDAO = deckDAO;
        this.userDAO = userDAO;
        this.cardDAO = cardDAO;
    }

    private String getSubject(String token) {
        return JWT.decode(token.split(" ")[1]).getSubject();
    }

    @PostMapping("create")
    public ResponseEntity<Deck> createDeck(@Valid @RequestBody Deck deck, @RequestHeader("Authorization") String token) {
        LOG.log(Level.INFO, "POST /deck/create {0}", deck);
        if (token == null) { return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); }

        try {
            String subject = getSubject(token);
            deck.setOwner(subject);
            deck.setId(null);

            Deck new_deck = deckDAO.save(deck);
            return new ResponseEntity<>(new_deck, HttpStatus.CREATED);
        } catch (Exception e) {
            LOG.log(Level.SEVERE, e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("delete/{deckId}")
    public ResponseEntity<String> deleteDeck(@PathVariable String deckId, @RequestHeader("Authorization") String token) {
        LOG.log(Level.INFO, "POST /deck/delete/{0}", deckId);
        if (token == null) { return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); }

        try {
            if (deckDAO.findById(deckId).isPresent()) {
                cardDAO.deleteCardsByDeckId(deckId);
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
    public ResponseEntity<Deck> updateDeck(@Valid @RequestBody Deck deck, @RequestHeader("Authorization") String token) {
        LOG.log(Level.INFO, "POST /deck/update {0}", deck);
        if (token == null) { return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); }

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

    @GetMapping("fetch")
    public ResponseEntity<ArrayList<Deck>> fetchDecks(@RequestHeader("Authorization") String token) {
        LOG.log(Level.INFO, "POST /deck/fetch/{0}", token);
        if (token == null) { return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); }
        String subject = getSubject(token);

        try {
            if (userDAO.findUserBySubject(subject).isPresent()) {
                ArrayList<Deck> decks = deckDAO.findDecksByOwner(subject);
                return new ResponseEntity<>(decks, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            LOG.log(Level.SEVERE, e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("fetch/{id}")
    public ResponseEntity<Deck> fetchDeck(@PathVariable String id, @RequestHeader("Authorization") String token) {
        LOG.log(Level.INFO, "POST /deck/fetch/{0}", id);
        if (token == null) { return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); }

        try {
            if (deckDAO.findById(id).isPresent()) {
                Deck deck = deckDAO.findById(id).get();
                return new ResponseEntity<>(deck, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            LOG.log(Level.SEVERE, e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}