import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL;

export const fetchSignUp = async (body: any) => {
  try {
    console.log('they call me');
    const response = await axios.post(`${URL}api/v1/users/signup`, body);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message + '1️⃣';
    } else if (error.request) {
      return error.request + '2️⃣';
    } else {
      return error.message + '3️⃣';
    }
  }
};

export const fetchLogin = async (body: any) => {
  const response = await axios.post(`${URL}api/v1/users/login`, body);
  return response.data;
};

export const fetchConfirmUser = async (body: any) => {
  const response = await axios.patch(`${URL}api/v1/users/confirmUser`, body);
  return response.data;
};

export const fetchLogout = async () => {
  const response = await axios.get(`${URL}api/v1/users/logout`);
  return response.data;
};
