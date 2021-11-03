import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL;

export const fetchSignUp = async (body: any) => {
  const response = await axios.post(`${URL}api/v1/users/signup`, body);
  return response.data;
};
