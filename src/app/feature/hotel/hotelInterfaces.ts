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
  selectedRoom?: Room;
  totalPrice?: number;
}

export interface SingleHotelUserInput {
  id: string;
  checkIn?: string;
  checkOut?: string;
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
  oneHotel?: Hotel;
}

export interface Room {
  _id: string;
  type: string;
  numberOfRooms: number;
  description: string;
  costPerNight: number;
  maxAdults: number;
  maxChildrens: number;
  roomAmenities: string[];
  meals: string[];
  images: string[];
}

export interface Amenities {
  amenities: string[];
  groupName: string;
}

export interface Hotel {
  _id: string;
  name: string;
  description: string;
  kind:
    | 'Hotel'
    | 'resort'
    | 'Hostel'
    | 'Apartment'
    | 'Guest House'
    | 'Campground';
  starRating: number;
  city: City;
  facilities: string[];
  amenityGroups: Amenities[];
  contact: {
    center?: {
      lon: number;
      lat: number;
    };
    postalCode: string;
    address: string;
  };
  room: Room[];
  images: string[];
}