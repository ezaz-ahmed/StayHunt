export interface LaunchState {
  status: "idle" | "loading" | "failed";
  cities: City[];
  launchUserInput?: LaunchUserInput;
  inputFirstLaunch?: any;
  inputSecendLaunch?: any;
  firstLaunchSelected: Boolean;
  SecendLaunchSelected: Boolean;
  launchFinalInput?: any;
  launchList: any;
  oneLaunch: any;
}

export interface City {
  _id: string;
  locId: string;
  locName: string;
  countryCode: string;
}

export interface LaunchUserInput {
  fromCity: City;
  toCity: City;
  journeyDate?: string;
  returnDate?: string;
  roundTrip: Boolean;
}
