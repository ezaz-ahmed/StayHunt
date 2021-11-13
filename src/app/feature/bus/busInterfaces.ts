export interface BusState {
  status: 'idle' | 'loading' | 'failed';
  city: City[];
  busUserInput?: BusUserInput;
}

export interface City {
  _id: string;
  locId: string;
  locName: string;
  countryCode: string;
}

export interface BusUserInput {
  city: City;
  journeyDate?: string;
  returnDate?: string;
  roundTrip: Boolean;
}
