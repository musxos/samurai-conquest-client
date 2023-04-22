import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type GameState = {
  samurai: number;
  land: number;
  samuraiOnLand: boolean;
  samuraiOnLandId: number;
  isLoaded: boolean;
};

export const initialState: GameState = {
  samurai: 0,
  land: 0,
  samuraiOnLand: false,
  samuraiOnLandId: 0,
  isLoaded: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setSamurai: (state, action: PayloadAction<number>) => {
      state.samurai = action.payload;
    },
  },
});

export const { setSamurai } = gameSlice.actions;

export default gameSlice.reducer;
