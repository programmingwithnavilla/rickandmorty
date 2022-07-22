import { NextApiResponse, NextApiRequest } from "next";
import Cookies from "cookies";

export const setCookie = (res: NextApiResponse, req: NextApiRequest) => {
  const cookies = new Cookies(req, res);
  cookies.set("favoriteCharacter", "navid", {
    httpOnly: true, // true by default
  });
};

export const getCookie = (res: NextApiResponse, req: NextApiRequest) => {
  const cookies = new Cookies(req, res);
  return cookies.get("favoriteCharacter");
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
