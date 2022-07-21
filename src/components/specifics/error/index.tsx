import React from "react";
import { IError } from "../../../infrastructure/interface";
const Error = ({
  statusCode = 500,
  message = "Internal Server Error",
}: IError) => <p>{`An error ${statusCode} ${message}`}</p>;

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
