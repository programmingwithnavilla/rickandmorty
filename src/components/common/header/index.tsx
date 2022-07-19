import React from "react";
import style from "./Header.module.css";
type AppProps = {
  name?: string;
};

const Header = ({ name = "Guest" }: AppProps) => (
  <header className=" d-flex align-items-center justify-content-between py-3 px-4">
    <span className={style["header-icon"]}></span>
    Hello {name}
  </header>
);

export default Header;
