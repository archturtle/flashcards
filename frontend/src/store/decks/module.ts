import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { compact, isNil } from "lodash";
import config from "../../../config";
import { email } from "./dummy";
import { Card, Deck } from "./types";
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
  decks: [],
  isFetchDecksLoading: false,
  fetchDecksError: null,

  cards: [],
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

export const createDeck = createAsyncThunk(
  "decks/create",
  async (deck: Partial<Deck>) => {
    try {
      const response = await axinst.post(
        `${config.api.development}/deck/create`,
        { ...deck, owner: email },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
);

export const fetchCards = createAsyncThunk(
  "cards/fetch",
  async (id: string) => {
    try {
      const response = await axinst.get(
        `${config.api.development}/card/deck/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
);

export const createCard = createAsyncThunk(
  "cards/create",
  async (card: Partial<Card>) => {
    try {
      const response = await axios.post(
        `${config.api.development}/card/create`,
        card,
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },
);

export const createManyCards = createAsyncThunk(
  "cards/create-many",
  async (cards: Partial<Card>[]) => {
    try {
      const response = await axios.post(
        `${config.api.development}/card/create-many`,
        cards,
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },
);

export const deleteCard = createAsyncThunk(
  "cards/delete",
  async (id: string) => {
    try {
      const response = await axios.post(
        `${config.api.development}/card/delete/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },
);

export const updateCard = createAsyncThunk(
  "cards/update",
  async (card: Partial<Card>) => {
    try {
      const response = await axios.post(
        `${config.api.development}/card/update`,
        card,
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },
);

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
      })
      .addCase(createDeck.fulfilled, (state, action) => {
        const newDeck = action.payload;
        return { ...state, decks: [...state.decks, newDeck] };
      })
      .addCase(createCard.fulfilled, (state, action) => {
        const newCard = action.payload;
        return { ...state, cards: [...state.cards, newCard] };
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
