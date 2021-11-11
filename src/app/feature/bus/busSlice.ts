import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBusCities } from './busApi';

import { BusState } from './busInterfaces';

const initialState: BusState = {
  status: 'idle',
  city: [],
  busUserInput: undefined,
};

export const fetchBusCitiesAsync = createAsyncThunk(
  'bus/fetchCity',
  async () => {
    const { data }: any = await fetchBusCities();
    return data;
  }
);

export const busSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {
    addUserInput: (state, action) => {
      state.busUserInput = action.payload;
    },
    addFinalInput: (state, action) => {
      state.busUserInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusCitiesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBusCitiesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.city = action.payload;
      })
      .addCase(fetchBusCitiesAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addUserInput, addFinalInput } = busSlice.actions;

export default busSlice.reducer;
