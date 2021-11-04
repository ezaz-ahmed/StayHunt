import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL;

export const fetchSignUp = async (body: any) => {
  const response = await axios.post(
    `${URL}api/v1/users/signup`,
    new FormData(body)
  );
  console.log(response);
  return response.data;
};

export const fetchConfirmUser = async (body: any) => {
  const response = await axios.post(`${URL}api/v1/users/confirmUser`, body);
  return response.data;
};
