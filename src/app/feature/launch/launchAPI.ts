import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL_LAUNCH;

export const fetchLaunchCities = async () => {
  const response = await axios.get(`${URL}api/v1/cities`);
  return response.data;
};

export const fetchLauchList = async (
  depDate: string,
  fromCityId: string,
  toCityId: string
) => {
  const response = await axios.get(
    `${URL}api/v1/launch-list?depDate=${depDate}&fromCity=${fromCityId}&toCity=${toCityId}`
  );
  return response.data;
};
