export interface BusState {
  status: 'idle' | 'loading' | 'failed';
  cities: City[];
  busUserInput?: BusUserInput;
  busFinalInput?: any;
  busList: any;
  oneBus: any;
}

export interface City {
  _id: string;
  locId: string;
  locName: string;
  countryCode: string;
}

export interface BusUserInput {
  fromCity: City;
  toCity: City;
  journeyDate?: string;
  returnDate?: string;
  roundTrip: Boolean;
}
