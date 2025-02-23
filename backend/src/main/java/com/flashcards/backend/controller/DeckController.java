package com.flashcards.backend.controller;

import com.flashcards.backend.model.Deck;
import com.flashcards.backend.persistence.CardDAO;
import com.flashcards.backend.persistence.DeckDAO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("deck")
public class DeckController {
    private static final Logger LOG = Logger.getLogger(DeckController.class.getName());
    private final DeckDAO deckDAO;
    private final CardDAO cardDAO;

    public DeckController(DeckDAO deckDAO, CardDAO cardDAO) {
        this.deckDAO = deckDAO;
        this.cardDAO = cardDAO;
    }

    @PostMapping("create")
    public ResponseEntity<Deck> createDeck(@Valid @RequestBody Deck deck) {
        LOG.log(Level.INFO, "POST /deck/create");

        try {
            String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            deck.setOwner(userId);
            deck.setId(null);

            Deck new_deck = deckDAO.save(deck);
            return new ResponseEntity<>(new_deck, HttpStatus.CREATED);
        } catch (Exception e) {
            LOG.log(Level.SEVERE, e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("delete/{deckId}")
    public ResponseEntity<String> deleteDeck(@PathVariable String deckId) {
        LOG.log(Level.INFO, "POST /deck/delete/{id}");

        try {
            String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (deckDAO.findById(deckId).isPresent()) {
                if (!deckDAO.deckIsOwnedBy(deckId, userId)) {
                    return new ResponseEntity<>(HttpStatus.FORBIDDEN);
                }

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
    public ResponseEntity<Deck> updateDeck(@Valid @RequestBody Deck deck) {
        LOG.log(Level.INFO, "POST /deck/update");

        try {
            String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (deckDAO.findById(deck.getId()).isPresent()) {
                if (!deckDAO.deckIsOwnedBy(deck.getId(), userId)) {
                    return new ResponseEntity<>(HttpStatus.FORBIDDEN);
                }

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
    public ResponseEntity<ArrayList<Deck>> fetchDecks() {
        LOG.log(Level.INFO, "POST /deck/fetch");

        try {
            String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            ArrayList<Deck> decks = deckDAO.findDecksByOwner(userId);
            return new ResponseEntity<>(decks, HttpStatus.OK);
        } catch (Exception e) {
            LOG.log(Level.SEVERE, e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("fetch/{id}")
    public ResponseEntity<Deck> fetchDeck(@PathVariable String id) {
        LOG.log(Level.INFO, "POST /deck/fetch/{id}");

        try {
            String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (deckDAO.findById(id).isPresent()) {
                if (!deckDAO.deckIsOwnedBy(id, userId)) {
                   return new ResponseEntity<>(HttpStatus.FORBIDDEN);
                }

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