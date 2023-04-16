import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import instance from '@/app/axios';

export interface UserState {
  nickName: string;
  address: string;
  clan: number;
  refer: string;
  point: number;
}

const initialState: UserState = {
  address: '',
  nickName: '',
  clan: 0,
  refer: '',
  point: 0,
};

export const fetchUser = createAsyncThunk('user/fetch', async (id: string) => {
  const response = await instance.get(`/user/${id}`);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update(state, action: PayloadAction<UserState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    reset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
  },
});

export const { update, reset } = userSlice.actions;
export default userSlice.reducer;
