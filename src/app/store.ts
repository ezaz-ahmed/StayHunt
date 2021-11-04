import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import hotelReducer from './feature/hotel/hotelSlice';
import userReducer from './feature/user/userSlices';

export const store = configureStore({
  reducer: {
    hotel: hotelReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
