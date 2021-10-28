import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchHotelLocation,
  fetchAllHotelList,
  fetchSingleHotel,
  fetchPaymentHotel,
} from './hotelAPI';

import {
  HotelState,
  Location,
  HotelUserInput,
  HotelInList,
  Hotel,
  SingleHotelUserInput,
} from './hotelInterfaces';

const initialState: HotelState = {
  status: 'idle',
  locations: [],
  hotelUserInput: undefined,
  allHotelList: [],
  oneHotel: undefined,
  finalSelection: undefined,
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

export const fetchSingleHotelAsync = createAsyncThunk(
  'hotel/fetchSingleHotel',
  async (userChosenData: SingleHotelUserInput): Promise<Hotel> => {
    const { id, checkIn, checkOut } = userChosenData;
    const { data }: any = await fetchSingleHotel(id, checkIn, checkOut);
    return data;
  }
);

export const fetchHotelPaymentAsync = createAsyncThunk(
  'hotel/payment',
  async (paymentDetails) => {
    return await fetchPaymentHotel(paymentDetails);
  }
);

export const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    addUserInput: (state, action) => {
      state.hotelUserInput = action.payload;
    },
    addFinalInput: (state, action) => {
      state.finalSelection = action.payload;
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
      })
      .addCase(fetchSingleHotelAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleHotelAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.oneHotel = action.payload;
      })
      .addCase(fetchSingleHotelAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addUserInput, addFinalInput } = hotelSlice.actions;

export default hotelSlice.reducer;
