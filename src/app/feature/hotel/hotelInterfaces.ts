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
  checkIn?: string;
  checkOut?: string;
  guest: Guests;
}

export interface SingleHotelUserInput {
  id: string;
  checkIn: string;
  checkOut: string;
}

export interface City {
  id: string;
  cityId: string;
  cityName: string;
  countryCode: string;
}

export interface HotelInList {
  _id: string;
  name: string;
  kind: string;
  starRating: number;
  city: City;
  images: string[];
  minPrice: number;
}

export interface HotelState {
  status: 'idle' | 'loading' | 'failed';
  locations: Location[];
  hotelUserInput?: HotelUserInput;
  allHotelList?: HotelInList[];
  hotel?: Hotel;
}

export interface Room {
  _id: string;
  roomAmenities: string[];
  meals: string[];
  images: string[];
  hotel: string;
  numberOfRooms: 6;
  type: string;
  description: string;
  costPerNight: number;
  maxAdults: number;
  maxChildrens: number;
  user: string;
  createdAt: string;
  updatedAt: string;
  booked: 0;
}

export interface Amenities {
  amenities: string[];
  groupName: string;
  _id: string;
}

export interface Hotel {
  _id: string;
  contact: {
    center: {
      lon: string;
      lat: string;
    };
    postalCode: string;
    address: string;
  };
  images: string[];
  name: string;
  description: string;
  city: City;
  starRating: number;
  amenityGroups: Amenities[];
  room: Room[];
}