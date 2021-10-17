// export interface FetchHotelAPI {
//   data: Location[];
// }

export interface Location {
  _id: string;
  variant: string;
  propertyId: string;
  hotelId?: string;
  hotelName?: string;
  cityId: string;
  cityName: string;
  countryCode: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Guests {
  room: number;
  adults: number;
  children: number;
}

export interface HotelUserInput {
  location: Location;
  checkIn: string;
  checkOut: string;
  guest: Guests;
}

export interface HotelState {
  status: 'idle' | 'loading' | 'failed';
  locations: Location[];
}
