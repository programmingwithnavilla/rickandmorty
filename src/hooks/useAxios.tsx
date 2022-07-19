import { useState, useEffect } from "react";
import { IUseAxios } from "../infrastructure/interface";
import axios from "axios";

axios.defaults.baseURL =
  process.env.BASE_URL || "https://rickandmortyapi.com/api/";

const useAxios = ({
  url,
  method = "GET",
  body,
  headers = null,
  cookie,
}: IUseAxios) => {
  console.log("use hooks");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);
  const options = {
    method: "get",
    url,
    body,
    headers: {
      "Content-Type": "application/json",
      cookie: cookie || "",
    },
  };

  const fetchData = async () => {
    try {
      const result = await axios.request(options);
      setResponse(result.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers, cookie]);

  return { response, error, loading };
};

export default useAxios;
