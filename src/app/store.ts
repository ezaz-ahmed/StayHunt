import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import hotelReducer from './feature/hotel/hotelSlice';
import busReducer from './feature/bus/busSlice';
import userReducer from './feature/user/userSlices';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const hotelPersistConfig = {
  key: 'hotel',
  storage: sessionStorage,
};

const busPersistConfig = {
  key: 'bus',
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  user: userReducer,
  bus: persistReducer(busPersistConfig, busReducer),
  hotel: persistReducer(hotelPersistConfig, hotelReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
