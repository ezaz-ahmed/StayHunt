import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSignUp } from './userApi';
import { UserState } from './userInterfaces';

const initialState: UserState = {
  isLogged: false,
  loading: false,
  userId: '',
  user: undefined,
};

export const fetchSignUpAsync = createAsyncThunk(
  'user/signup',
  async (userChosenData) => {
    const res: any = await fetchSignUp(userChosenData);

    if (res.status === 'success') {
      return res.data.userId;
    } else {
      return res.message;
    }
  }
);

export const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUpAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSignUpAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchSignUpAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const {} = hotelSlice.actions;

export default hotelSlice.reducer;
