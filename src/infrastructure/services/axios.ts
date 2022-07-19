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
  try {
    const result = await axios.request(options);
    return result.data;
  } catch (error: any) {
    return error;
  }
};

export default ApiCall;
