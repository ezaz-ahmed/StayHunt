import axios from "axios";
import { Location } from './hotelInterfaces';

const URL = process.env.REACT_APP_SERVER_URL_HOTEL;

export const fetchHotelLocation = async () => {
  const response = await axios.get(`${URL}api/v1/search-items`);
  return response.data;
};

export const fetchAllHotelList = async (
  propertyCode: Location['propertyId'],
  checkin: string | undefined,
  checkOut: string | undefined
) => {
  const response = await axios.get(
    `${URL}api/v1/hotel-list?propertyCode=${propertyCode}&&checkin=${checkin}&checkout=${checkOut}`
  );
  return response.data;
};
