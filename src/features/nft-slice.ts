import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import instance from '@/app/axios';

export interface NftState {
  [key: string]: any;
}

const initialState: NftState = {};

export const fetchNft = createAsyncThunk('nft/fetch', async (id: string) => {
  const response = await instance.get(`/nft/${id}`);
  return response.data;
});

const nftSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    [fetchNft.fulfilled.type]: (state, action: PayloadAction<NftState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export default nftSlice.reducer;
