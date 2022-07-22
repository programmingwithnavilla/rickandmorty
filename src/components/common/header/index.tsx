import React from "react";
import { NextApiResponse, NextApiRequest } from "next";
import Logo from "../../../assets/icons/logo";
import RickAndMorty from "../../../assets/icons/rickAndMory";
import { getCookie } from "../../../utils/index";
import style from "./Header.module.css";
import { NextResponse, NextRequest } from "next/server";
import Cookies from "cookies";

export async function getServerSideProps({ params }: any) {
  console.log("----getServerSidePropsgetServerSideProps---");
}
const Header = (props: any) => {
  return (
    <header className=" d-flex align-items-center justify-content-between py-2 px-4">
      <Logo />
      <RickAndMorty />
      <span>Hello </span>
    </header>
  );
};

export default Header;
