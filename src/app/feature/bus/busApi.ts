import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL_BUS;

export const fetchBusCities = async () => {
  const response = await axios.get(`${URL}api/v1/cities`);
  return response.data;
};

export const fetchBusList = async (
  depDate: string,
  fromCityId: string,
  toCityId: string
) => {
  const response = await axios.get(
    `${URL}api/v1/bus-list?depDate=${depDate}&fromCity=${fromCityId}&toCity=${toCityId}`
  );
  return response.data;
};

