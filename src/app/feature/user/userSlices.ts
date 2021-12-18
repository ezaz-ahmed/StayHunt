import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLogout } from './userApi';
import { UserState } from './userInterfaces';

const initialState: UserState = {
  isLogged: false,
  loading: false,
  userId: '',
  user: undefined,
  userDetails: undefined,
  token: '',
};

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
    addUserIdForVerification: (state, action) => {
      console.log(action, '🙋‍♂️');
      state.userId = action.payload;
    },
  },

  // Will Remove Fetch Sign Up Async Soon
  extraReducers: (builder) => {
    builder
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

export const { addUserInput, addUserDetails, addUserIdForVerification } =
  userSlice.actions;

export default userSlice.reducer;
