import axios from "axios";

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
  console.log(fromCityId, toCityId, depDate, "👈");
  const response = await axios.get(
    `${URL}api/v1/bus-list?depDate=${depDate}&fromCity=${fromCityId}&toCity=${toCityId}`
  );
  return response.data;
};

export const fetchSingleBus = async (
  id: string,
  depDate: string,
  fromLocId: string,
  toLocId: string
) => {
  const response = await axios.get(
    `${URL}api/v1/bus-list/${id}?depDate=${depDate}&fromCity=${fromLocId}&toCity=${toLocId}`
  );
  return response.data;
};

export const fetchPaymentBus = async (body: any, token: string) => {
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
    console.log(error);
    throw new Error("Something went wrong");
  }
};
