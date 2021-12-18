import axios from 'axios';
const URL = process.env.REACT_APP_SERVER_URL;

export const fetchAllBooking = async (type: string, token: string) => {
  try {
    const response: any = await axios({
      method: 'GET',
      url: `${URL}api/v1/my-bookings?type=${type}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data.data, 'from', type);
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
