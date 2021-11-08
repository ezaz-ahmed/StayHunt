import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSignUp, fetchConfirmUser } from './userApi';
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

export const fetchConfirmAsync = createAsyncThunk(
  'user/confirm',
  async (userChosenData: any) => {
    const res: any = await fetchConfirmUser(userChosenData);
    console.log(res, '⚡');
    if (res.status === 'success') {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', res.data.user);
      console.log(res.data.token, '🙊');
      console.log(res.data.user, '🤵');
      return res.data.user;
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
        state.userId = action.payload;
      })
      .addCase(fetchSignUpAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchConfirmAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConfirmAsync.fulfilled, (state, action) => {
        console.log(action, '🎬');
        state.loading = false;
        state.isLogged = true;
        state.userDetails = action.payload;
      })
      .addCase(fetchConfirmAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addUserInput } = userSlice.actions;

export default userSlice.reducer;
