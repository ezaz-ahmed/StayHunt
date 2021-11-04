import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSignUp, fetchConfirmUser } from './userApi';
import { UserState, UserInputForSignUp, ConfirmUser } from './userInterfaces';

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

export const fetchConfirmAsync = createAsyncThunk(
  'user/confirm',
  async (userChosenData: ConfirmUser) => {
    const res: any = await fetchConfirmUser(userChosenData);

    console.log(res, '💀💀');
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
        state.userId = action.payload;
      })
      .addCase(fetchSignUpAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchConfirmAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConfirmAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchConfirmAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addUserInput } = userSlice.actions;

export default userSlice.reducer;
