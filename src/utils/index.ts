import { NextApiResponse, NextApiRequest } from "next";
import Cookies from "cookies";

export const setCookie = (
  res: NextApiResponse,
  req: NextApiRequest,
  key: string,
  value: string
) => {
  const cookies = new Cookies(req, res);
  cookies.set(key, value, {
    httpOnly: true, // true by default
  });
};

export const getCookie = (res: any, req: any, key: string) => {
  const cookies = new Cookies(req, res);
  return cookies.get(key);
};

export const Conditional = ({ checkRender, children }: any) => {
  return !!checkRender && children;
};

export const enumToArray = (list: any) => {
  return Object.keys(list)
    .filter((v) => isNaN(Number(v)))
    .map((name) => {
      return {
        id: list[name as keyof typeof list],
        value: name,
      };
    });
};
