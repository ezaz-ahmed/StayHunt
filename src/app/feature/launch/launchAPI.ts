import axios from 'axios';

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

export const fetchSingleLaunch = async (
  id: string,
  depDate: string,
  fromLocId: string,
  toLocId: string
) => {
  const response = await axios.get(
    `${URL}api/v1/launch-list/${id}?depDate=${depDate}&fromCity=${fromLocId}&toCity=${toLocId}`
  );
  return response.data;
};

export const fetchPaymentLaunch = async (body: any, token: string) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await axios.post(
      `${URL}api/v1/bookings/checkout-sslcommerz`,
      body,
      config
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
