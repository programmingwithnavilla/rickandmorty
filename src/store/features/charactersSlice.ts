import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICharacters } from "../../infrastructure/interface";

const intialState: ICharacters = {
  id: 0,
  name: "",
  status: "",
  species: "",
  type: "",
  gender: "",
  origin: {
    name: "",
    url: "",
  },
  location: {
    name: "",
    url: "",
  },
  image: "",
  episode: [],
  created: "",
};

const charactersSlice = createSlice({
  name: "character",
  initialState: {
    characterInfo: intialState,
  },
  reducers: {
    setCharacter(state: any, action: PayloadAction<ICharacters>) {
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
