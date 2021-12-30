import axios from 'axios';
const URL = process.env.REACT_APP_SERVER_URL;

export const fetchAllBooking = async (type: string, token: string) => {
  try {
    const response: any = await axios({
      method: 'GET',
      url: `${URL}api/v1/my-bookings?type=${type}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message;
    } else if (error.request) {
      return error.request;
    } else {
      return error.message;
    }
  }
};

export const fetchCancelBooking = async (bookingId: string, token: string) => {
  try {
    const response: any = await axios({
      method: 'GET',
      url: `${URL}api/v1/my-bookings/cancel-booking/${bookingId}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message;
    } else if (error.request) {
      return error.request;
    } else {
      return error.message;
    }
  }
};

export const fetchRefund = async (body: any, token: string) => {
  try {
    const response: any = await axios({
      method: 'POST',
      url: `${URL}api/v1/refunds`,
      headers: { Authorization: `Bearer ${token}` },
      data: body,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message;
    } else if (error.request) {
      return error.request;
    } else {
      return error.message;
    }
  }
};
