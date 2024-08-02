import axios from "axios";

const axiosInstatance = (baseURL, token) => {
  const headers = {};

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL,
    headers,
  });
};

export const Satellite = (token) => {
  return axiosInstatance(
    process.env.REACT_APP_API_HOST ||
      "https://mock.apidog.com/m1/523540-0-default",
    token
  );
};
