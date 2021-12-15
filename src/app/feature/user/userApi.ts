import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL;

export const fetchSignUp = async (body: any) => {
  try {
    const response = await axios.post(`${URL}api/v1/users/signup`, body);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchLogin = async (body: any) => {
  try {
    const response = await axios.post(`${URL}api/v1/users/login`, body);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchConfirmUser = async (body: any) => {
  try {
    const response = await axios.patch(`${URL}api/v1/users/confirmUser`, body);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchLogout = async () => {
  try {
    const response = await axios.get(`${URL}api/v1/users/logout`);

    return response.data;
  } catch (error) {
    return error;
  }
};
