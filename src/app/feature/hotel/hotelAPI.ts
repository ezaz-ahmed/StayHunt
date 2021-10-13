import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL_HOTEL;

export const fetchHotelLocation = async () => {
  const response = await axios.get(`${URL}api/v1/search-items`);
  return response.data;
};
