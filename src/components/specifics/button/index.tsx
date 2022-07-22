import React from "react";
import SearchIcon from "../../../assets/icons/search";
import style from "./searchbox.module.css";
import { IButton } from "../../../infrastructure/interface/component";

const Button = ({
  className = "btn-primary",
  label = "Search",
  onClick,
}: IButton) => (
  <button type="button" className={`btn ${className}`} onClick={() => onClick}>
    {label}
  </button>
);

export default Button;
