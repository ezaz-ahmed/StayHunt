// export interface FetchHotelAPI {
//   data: Location[];
// }

export interface Location {
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
  guestRooms: number;
  guestAdults: number;
  guestChildren: number;
}

export interface HotelUserInput {
  location: Location;
  checkIn: string | undefined;
  checkOut: string | undefined;
  guest: Guests;
}

export interface HotelState {
  status: 'idle' | 'loading' | 'failed';
  locations: Location[];
  hotelUserInput?: HotelUserInput;
}
