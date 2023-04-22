import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type GameState = {
  samurai: number;
  land: number;
  deck: number[];
  isLoaded: boolean;
};

export const initialState: GameState = {
  samurai: 0,
  land: 0,
  deck: [],
  isLoaded: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setSamurai: (state, action: PayloadAction<number>) => {
      state.samurai = action.payload;
    },
    setLand: (state, action: PayloadAction<number>) => {
      state.land = action.payload;
    },
    setDeck: (state, action: PayloadAction<number[]>) => {
      state.deck = action.payload;
    },
  },
});

export const { setSamurai, setDeck, setLand } = gameSlice.actions;

export default gameSlice.reducer;
