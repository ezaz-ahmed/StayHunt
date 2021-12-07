import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLaunchCities,
  fetchLauchList,
  fetchSingleLaunch,
} from "./launchAPI";

import { LaunchState } from "./launchInterfaces";

const initialState: LaunchState = {
  status: "idle",
  cities: [],
  launchUserInput: undefined,
  launchList: [],
  inputFirstLaunch: undefined,
  inputSecendLaunch: undefined,
  firstLaunchSelected: false,
  SecendLaunchSelected: false,
  launchFinalInput: undefined,
  oneLaunch: undefined,
};

export const fetchLaunchCitiesAsync = createAsyncThunk(
  "launch/fetchCities",
  async () => {
    const { data }: any = await fetchLaunchCities();
    return data;
  }
);

export const fetchLaunchListAsync = createAsyncThunk(
  "launch/fetchLaunchList",
  async (userData: any) => {
    const { depDate, fromCityId, toCityId } = userData;
    const { data }: any = await fetchLauchList(depDate, fromCityId, toCityId);
    return data;
  }
);

export const fetchSingleLaunchlAsync = createAsyncThunk(
  "launch/fetchSingleLaunch",
  async (userChosenData: any) => {
    const { id, depDate, fromLocId, toLocId } = userChosenData;

    const { data }: any = await fetchSingleLaunch(
      id,
      depDate,
      fromLocId,
      toLocId
    );
    return data;
  }
);

export const launchSlice = createSlice({
  name: "lauch",
  initialState,
  reducers: {
    addUserInput: (state, action) => {
      state.launchUserInput = action.payload;
    },
    addFinalInput: (state, action) => {
      state.launchFinalInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaunchCitiesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLaunchCitiesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cities = action.payload;
      })
      .addCase(fetchLaunchCitiesAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchLaunchListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLaunchListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.launchList = action.payload;
      })
      .addCase(fetchLaunchListAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchSingleLaunchlAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleLaunchlAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.oneLaunch = action.payload;
      })
      .addCase(fetchSingleLaunchlAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addUserInput, addFinalInput } = launchSlice.actions;

export default launchSlice.reducer;
