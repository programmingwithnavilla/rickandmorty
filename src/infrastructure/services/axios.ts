import { IUseAxios } from "../interface";
import axios from "axios";

const ApiCall = async ({
  url,
  method = "GET",
  body,
  headers = null,
  cookie,
}: IUseAxios) => {
  axios.defaults.baseURL = "https://rickandmortyapi.com/api/";
  const options = {
    method,
    url: "https://rickandmortyapi.com/api/" + url,
    body,
  };

  return axios(options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("--------Show error notification!--------", error.response);
      return Promise.reject(error.response);
    });
};

export default ApiCall;
