import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Card, Deck } from "./types";
import { dummyCards, dummyDecks, email } from "./dummy";
import { compact, isNil } from "lodash";
import config from "../../../config";
import axinst from "@/utils/axiosInstance";

interface DecksState {
  decks: Deck[];
  isFetchDecksLoading: boolean;
  fetchDecksError: string | null;

  cards: Card[];
  isFetchCardsLoading: boolean;
  fetchCardsError: string | null;
}

const initialState: DecksState = {
  // TOOD: replace with real decks
  decks: dummyDecks,
  isFetchDecksLoading: false,
  fetchDecksError: null,

  cards: dummyCards,
  isFetchCardsLoading: false,
  fetchCardsError: null,
};

export const fetchDecks = createAsyncThunk("decks/fetch", async () => {
  try {
    const response = await axinst.get(
      `${config.api.development}/deck/fetch/${email}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
});

export const createDeck = createAsyncThunk("decks/create", async () => {
  try {
    const response = await axinst.get(
      `${config.api.development}/deck/create/${email}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

export const fetchCards = createAsyncThunk("cards/fetch", async (id: string) => {
  try {
    const response = await axinst.get(
      `${config.api.development}/card/deck/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error)
  }
});

const decksSlice = createSlice({
  name: "decks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDecks.pending, (state) => {
        state.isFetchDecksLoading = true;
        state.fetchDecksError = null;
      })
      .addCase(fetchDecks.fulfilled, (state, action) => {
        state.isFetchDecksLoading = false;
        state.decks = action.payload;
      })
      .addCase(fetchDecks.rejected, (state, action) => {
        state.isFetchDecksLoading = false;
        state.fetchDecksError = action.error.message ?? "Error fetching decks";
      })
      .addCase(fetchCards.pending, (state) => {
        state.isFetchCardsLoading = true;
        state.fetchCardsError = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.isFetchCardsLoading = false;
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.isFetchCardsLoading = false;
        state.fetchCardsError = action.error.message ?? "Error fetching cards";
      });
  },
});

export const selectDecks = (state: { decks: DecksState }) => state.decks.decks;

export const selectDeckById = (id: string) => (state: { decks: DecksState }) =>
  state.decks.decks.find((deck) => deck.id === id);

export const selectCards = (state: { decks: DecksState }) => state.decks.cards;

export const selectCardsByDeckId =
  (id: string) => (state: { decks: DecksState }) => {
    const deck = state.decks.decks.find((deck) => deck.id === id);
    if (isNil(deck)) return [];
    const cardIds = deck.cards;
    const cards = state.decks.cards;
    return compact(
      cardIds.map((cardId) => cards.find((card) => card.id === cardId)),
    );
  };

export const decksActions = decksSlice.reducer;
