import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchHotelLocation, fetchAllHotelList } from './hotelAPI';

import {
  HotelState,
  Location,
  HotelUserInput,
  HotelInList,
} from './hotelInterfaces';

const initialState: HotelState = {
  status: 'idle',
  locations: [],
  hotelUserInput: undefined,
  allHotelList: [],
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

export const fetchAllHotelAsync = createAsyncThunk(
  'hotel/fetchAllHotel',
  async (userChosenData: HotelUserInput): Promise<HotelInList[]> => {
    const { location, checkIn, checkOut } = userChosenData;
    const { data }: any = await fetchAllHotelList(
      location.propertyId,
      checkIn,
      checkOut
    );

    return data;
  }
);

export const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    addUserInput: (state, action: PayloadAction<HotelUserInput>) => {
      state.hotelUserInput = action.payload;
    },
  },
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
      })
      .addCase(fetchAllHotelAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllHotelAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.allHotelList = action.payload;
      })
      .addCase(fetchAllHotelAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addUserInput } = hotelSlice.actions;

export default hotelSlice.reducer;
