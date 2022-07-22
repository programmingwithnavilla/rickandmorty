import React from "react";
import type { NextPage } from "next";
import Logo from "../../../assets/icons/logo";
import RickAndMorty from "../../../assets/icons/rickAndMory";
import style from "./Header.module.css";

const Header: NextPage = (props: any) => {
  return (
    <header className=" d-flex align-items-center justify-content-between py-2 px-4">
      <Logo />
      <RickAndMorty />
      <span>Hello </span>
    </header>
  );
};

export default Header;
