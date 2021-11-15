import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBusCities, fetchBusList } from './busApi';

import { BusState } from './busInterfaces';

const initialState: BusState = {
  status: 'idle',
  cities: [],
  busUserInput: undefined,
  busList: [],
};

export const fetchBusCitiesAsync = createAsyncThunk(
  'bus/fetchCities',
  async () => {
    const { data }: any = await fetchBusCities();
    return data;
  }
);

export const fetchBusListAsync = createAsyncThunk(
  'bus/fetchBusList',
  async (userData: any) => {
    const { depDate, fromCityId, toCityId } = userData;
    const { data }: any = await fetchBusList(depDate, fromCityId, toCityId);
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
        state.cities = action.payload;
      })
      .addCase(fetchBusCitiesAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchBusListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBusListAsync.fulfilled, (state, action) => {
        state.status = 'loading';
        state.busList = action.payload;
      })
      .addCase(fetchBusListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addUserInput, addFinalInput } = busSlice.actions;

export default busSlice.reducer;
