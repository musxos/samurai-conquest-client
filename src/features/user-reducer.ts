import { createSlice } from '@reduxjs/toolkit';

export type UserState = {
  nickName: string;
  address: string;
  refer: string;
  clan: number;
  point: number;

  isLogged: boolean;
};

export const initialState: UserState = {
  nickName: null,
  address: null,
  refer: null,
  clan: 0,
  point: 0,

  isLogged: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = userSlice.actions;

export default userSlice.reducer;
