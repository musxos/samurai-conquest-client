import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import instance from '@/app/axios';

export interface MapState {
  lands: any[];
  land: any;
}

const initialState: MapState = {
  lands: [],
  land: null,
};

export const fetchLands = createAsyncThunk('lands/fetch', async () => {
  const response = await instance.get(`/lands`);
  return response.data;
});

export const fetchLand = createAsyncThunk('clans/top', async (id: string) => {
  const response = await instance.get(`/lands/` + id);
  return response.data;
});

const topSlice = createSlice({
  name: 'top',
  initialState,
  reducers: {
    update(state, action: PayloadAction<MapState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLands.fulfilled, (state, action) => {
      return {
        ...state,
        lands: action.payload,
      };
    });

    builder.addCase(fetchLand.fulfilled, (state, action) => {
      return {
        ...state,
        land: action.payload,
      };
    });
  },
});

export const { update } = topSlice.actions;
export default topSlice.reducer;
