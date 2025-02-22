// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { decksActions } from "./decks/module";

export const store = configureStore({
  reducer: {
    decks: decksActions, // Use your slice reducer here
  },
});

// TypeScript: Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
