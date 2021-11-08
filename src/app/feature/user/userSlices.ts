import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchSignUp,
  fetchConfirmUser,
  fetchLogout,
  fetchLogin,
} from './userApi';
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

export const fetchLoginAsync = createAsyncThunk(
  'user/login',
  async (userChosenData: any) => {
    const res: any = await fetchLogin(userChosenData);
    return res;
  }
);

export const fetchConfirmAsync = createAsyncThunk(
  'user/confirm',
  async (userChosenData: any) => {
    const res: any = await fetchConfirmUser(userChosenData);
    return res;
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
        state.isLogged = true;
        state.userDetails = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(fetchConfirmAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchLoginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogged = true;
        state.userDetails = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(fetchLoginAsync.rejected, (state) => {
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

export const { addUserInput } = userSlice.actions;

export default userSlice.reducer;
