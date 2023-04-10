import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LayoutState {
  wallet: boolean;
  search: boolean;
  notifications: boolean;
  messages: boolean;
  profile: boolean;
}

const initialState: LayoutState = {
  wallet: true,
  search: true,
  notifications: true,
  messages: true,
  profile: true,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    update(state, action: PayloadAction<LayoutState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { update } = layoutSlice.actions;
export default layoutSlice.reducer;
