import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Characters } from "../../infrastructure/interface";

const intialState: Characters = {
  id: "",
  name: "",
  status: "",
  species: "",
  type: "",
  gender: "",
  origin: "",
  location: "",
  image: "",
  episode: "",
  created: "",
};

const charactersSlice = createSlice({
  name: "character",
  initialState: {
    characterInfo: intialState,
  },
  reducers: {
    setCharacter(state: any, action: PayloadAction<Characters>) {
      console.log("---state---", state);
      console.log("----", action.payload);
      state.characterInfo = { ...action.payload };
    },
    clearCharacter(state: any) {
      console.log("---clear---");
      state.characterInfo = { ...intialState };
    },
  },
});

export const { setCharacter, clearCharacter } = charactersSlice.actions;
export const selectCharacter = (state: any) => state.character;

export default charactersSlice.reducer;
