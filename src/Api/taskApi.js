import axios from "axios";

export const taskapi = axios.create({
  baseURL: "http://127.0.0.1:8000/task_api",
});

export const tokenConfig = () => {
  const token = process.env.REACT_APP_API_TOKEN;
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
