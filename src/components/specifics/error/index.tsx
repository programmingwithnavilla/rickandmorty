import React from "react";
import style from "./Error.module.css";
import { IError } from "../../../infrastructure/interface";

const Error = ({
  statusCode = 500,
  message = "Internal Server Error",
}: IError) => (
  <div className="col d-flex flex-column align-items-center justify-content-center bg-white mx-3 p-3 rounded-3">
    <span className={`${style.text} ${style.errGradient}`}>Oops</span>
    <span className={`${style.StatusText} ${style.errGradient}`}>
      {statusCode}
    </span>
    <span className={`${style.StatusText} ${style.errGradient}`}>
      {message}
    </span>
  </div>
);

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
