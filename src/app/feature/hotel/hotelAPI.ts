import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL_HOTEL;

export const fetchHotelLocation = async () => {
  const response = await axios.get(`${URL}api/v1/search-items`);
  return response.data;
};

export const fetchAllHotelList = async (
  propertyCode: string,
  checkin?: string,
  checkOut?: string
) => {
  const response: any = await axios.get(
    `${URL}api/v1/hotel-list?propertyCode=${propertyCode}&checkin=${checkin}&checkout=${checkOut}`
  );

  return response.data;
};

export const fetchSingleHotel = async (
  id: string,
  checkin?: string,
  checkOut?: string
) => {
  const response = await axios.get(
    `${URL}api/v1/hotel-list/${id}?checkin=${checkin}&checkout=${checkOut}`
  );
  return response.data;
};

export const fetchPaymentHotel = async (body: any, token: string) => {
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
