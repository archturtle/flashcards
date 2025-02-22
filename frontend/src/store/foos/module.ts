import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Foo } from "./types";

interface FoosState {
  foos: Foo[];
  isFetchFoosLoading: boolean;
  fetchFoosError: string | null;
}

const initialState: FoosState = {
  foos: [],
  isFetchFoosLoading: false,
  fetchFoosError: null,
};

export const fetchFoos = createAsyncThunk("foos/fetch", async () => {
  // TODO: implement
  return [];
});

const foosSlice = createSlice({
  name: "foos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoos.pending, (state) => {
        state.isFetchFoosLoading = true;
        state.fetchFoosError = null;
      })
      .addCase(fetchFoos.fulfilled, (state, action) => {
        state.isFetchFoosLoading = false;
        state.foos = action.payload;
      })
      .addCase(fetchFoos.rejected, (state, action) => {
        state.isFetchFoosLoading = false;
        state.fetchFoosError = action.error.message ?? "Error fetching foos";
      });
  },
});

export const selectFoos = (state: { foos: FoosState }) => state.foos.foos;

export const foosActions = foosSlice.reducer;
