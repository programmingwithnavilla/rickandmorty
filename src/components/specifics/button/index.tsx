import React, { memo } from "react";
import { IButton } from "../../../infrastructure/interface/component";

const Button = ({
  className = "btn-primary",
  label = "Search",
  onClick,
  disabled,
}: IButton) => (
  <button
    type="button"
    className={`btn ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

export default memo(Button);
