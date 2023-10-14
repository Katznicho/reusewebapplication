import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const Config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (token) {
    Config.headers["Authorization"] = `JWT ${token}`;
  }
  return Config;
};
