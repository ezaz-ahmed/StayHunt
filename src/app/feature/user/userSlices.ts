import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSignUp, fetchLogout } from './userApi';
import { UserState } from './userInterfaces';

const initialState: UserState = {
  isLogged: false,
  loading: false,
  userId: '',
  user: undefined,
  userDetails: undefined,
  token: '',
};

export const fetchSignUpAsync = createAsyncThunk(
  'user/signup',
  async (userChosenData: any) => {
    const res: any = await fetchSignUp(userChosenData);

    if (res.status === 'success') {
      return res.data.userId;
    } else {
      return res.message;
    }
  }
);

export const fetchLogoutAsync = createAsyncThunk('user/logout', async () => {
  const res = await fetchLogout();
  return res;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserInput: (state, action) => {
      state.user = action.payload;
    },
    addUserDetails: (state, action) => {
      state.isLogged = true;
      state.token = action.payload.token;
      state.userDetails = action.payload.user;
    },
  },

  // Will Remove Fetch Sign Up Async Soon
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
      .addCase(fetchLogoutAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogoutAsync.fulfilled, (state) => {
        state.token = '';
        state.userDetails = undefined;
        state.isLogged = false;
        state.loading = false;
      });
  },
});

export const { addUserInput, addUserDetails } = userSlice.actions;

export default userSlice.reducer;
