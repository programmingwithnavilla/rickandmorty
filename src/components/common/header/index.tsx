import React, { useEffect } from "react";
import Logo from "../../../assets/icons/logo";
import RickAndMorty from "../../../assets/icons/rickAndMory";
import Button from "../../specifics/button";
import { useCookies } from "react-cookie";

const Header = (props: any) => {
  const [cookies, setCookie] = useCookies(["favorite"]);

  const resetCookie = () => {
    setCookie("favorite", {});
  };
  return (
    <header className=" d-flex align-items-center justify-content-between py-2 px-4">
      <Logo />
      <div className="ps-4">
        <RickAndMorty />
      </div>
      <div className="d-flex align-items-center">
        <Button
          label="Reset Cookie"
          className="btn-outline-danger mx-2"
          onClick={resetCookie}
        />
        <span className="fs-5">
          Hello, {cookies?.favorite?.name || "Guest"}{" "}
        </span>
      </div>
    </header>
  );
};

export default Header;
