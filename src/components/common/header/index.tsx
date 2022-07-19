import React from "react";
import Logo from "../../../assets/icons/logo";
import RickAndMorty from "../../../assets/icons/rickAndMory";
import style from "./Header.module.css";
type AppProps = {
  name?: string;
};

const Header = ({ name = "Guest" }: AppProps) => (
  <header className=" d-flex align-items-center justify-content-between py-2 px-4">
    <Logo />
    <RickAndMorty />
    Hello {name}
  </header>
);

export default Header;
