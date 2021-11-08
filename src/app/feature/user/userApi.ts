import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL;

export const fetchSignUp = async (body: any) => {
  try {
    const response = await axios.post(`${URL}api/v1/users/signup`, body);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchConfirmUser = async (body: any) => {
  try {
    const response = await axios.patch(`${URL}api/v1/users/confirmUser`, body);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
