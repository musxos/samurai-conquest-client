import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import instance from '@/app/axios';

export interface TopState {
  users: any[];
  clans: any[];
}

const initialState: TopState = {
  users: [],
  clans: [],
};

export const fetchTopUsers = createAsyncThunk('users/top', async () => {
  const response = await instance.get(`/top_users_long`);
  return response.data;
});

export const fetchTopClans = createAsyncThunk('clans/top', async () => {
  const response = await instance.get(`/clans`);
  return response.data;
});

const topSlice = createSlice({
  name: 'top',
  initialState,
  reducers: {
    update(state, action: PayloadAction<TopState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopUsers.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    });

    builder.addCase(fetchTopClans.fulfilled, (state, action) => {
      return {
        ...state,
        clans: action.payload,
      };
    });
  },
});

export const { update } = topSlice.actions;
export default topSlice.reducer;
