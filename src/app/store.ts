import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import hotelReducer from './feature/hotel/hotelSlice';

export const store = configureStore({
  reducer: {
    hotel: hotelReducer,
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
