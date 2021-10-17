import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchHotelLocation } from './hotelAPI';

import { HotelState, Location } from './hotelInterfaces';

const initialState: HotelState = {
  status: 'idle',
  locations: [],
};

export const fetchHotelLocationAsync = createAsyncThunk(
  'hotel/fetchLocation',
  async () => {
    const { data }: any = await fetchHotelLocation();
    const cityArray: Location[] = [];

    data.map(
      (property: Location) =>
        property.variant === 'city' && cityArray.push(property)
    );
    return cityArray;
  }
);

export const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotelLocationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHotelLocationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.locations = action.payload;
      })
      .addCase(fetchHotelLocationAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default hotelSlice.reducer;
