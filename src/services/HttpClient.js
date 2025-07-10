import axios from "axios";
import * as Url from "../constant/url";
const client = axios.create({
  //baseURL: "https://youuup.com/youuupapi/",
 baseURL: Url.BASE_URL,

  // headers: {
  //   "Content-Type": "application/json",
  // },
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject({ error: "connectionError" });
    } else {
      return Promise.reject(error);
    }
  }
);

const setAuthorization = (token) => {
  client.defaults.headers.common.authorization ="Bearer "+token;
};

const clearAuthorization = () => {
  delete client.defaults.headers.common.authorization;
};
export const HttpClient = { ...client, setAuthorization, clearAuthorization };
