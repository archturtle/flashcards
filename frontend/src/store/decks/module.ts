import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Deck } from "./types";
import { dummyDecks } from "./dummyDecks";

interface DecksState {
  decks: Deck[];
  isFetchDecksLoading: boolean;
  fetchDecksError: string | null;
}

const initialState: DecksState = {
  // TOOD: replace with real decks
  decks: dummyDecks,
  isFetchDecksLoading: false,
  fetchDecksError: null,
};

export const fetchDecks = createAsyncThunk("decks/fetch", async () => {
  // TODO: implement
  return [];
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
      });
  },
});

export const selectDecks = (state: { decks: DecksState }) => state.decks.decks;

export const decksActions = decksSlice.reducer;
