import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSignUp } from './userApi';
import { UserState, UserInputForSignUp } from './userInterfaces';

const initialState: UserState = {
  isLogged: false,
  loading: false,
  userId: '',
  user: undefined,
};

export const fetchSignUpAsync = createAsyncThunk(
  'user/signup',
  async (userChosenData: UserInputForSignUp) => {
    const res: any = await fetchSignUp(userChosenData);

    if (res.status === 'success') {
      return res.data.userId;
    } else {
      return res.message;
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserInput: (state, action) => {
      state.user = action.payload;
    },
  },
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

export const { addUserInput } = userSlice.actions;

export default userSlice.reducer;
