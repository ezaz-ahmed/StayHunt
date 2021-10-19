import axios from "axios";
import { Location } from './hotelInterfaces';

const URL = process.env.REACT_APP_SERVER_URL_HOTEL;

export const fetchHotelLocation = async () => {
  const response = await axios.get(`${URL}api/v1/search-items`);
  return response.data;
};

export const fetchAllHotelList = async (
  propertyCode: Location,
  checkin: string,
  checkOut: string
) => {
  const response = await axios.get(
    `${URL}api/v1/hotel-list?${propertyCode}&${checkin}&${checkOut}`
  );
  return response.data;
};
