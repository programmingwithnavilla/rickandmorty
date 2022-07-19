import { configureStore } from "@reduxjs/toolkit";

import charactersReducer from "./features/charactersSlice";

const store = configureStore({
  reducer: {
    // Define a top-level state field named `characters`, handled by `charactersReducerReducer`
    character: charactersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
