import React, { Fragment, memo } from "react";
import { IPagination } from "../../../infrastructure/interface/component";

const Pagination = ({ total, current, pagination }: IPagination) => {
  const handlePagination = (current: any) => {
    pagination(current);
  };
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              className={`page-link ${
                current === 1 ? "disabled" : current > 1 ? "" : ""
              }`}
              href="#"
              onClick={() => handlePagination(current - 1)}
            >
              Previous
            </a>
          </li>
          {total < 7 ? (
            <>
              {Array.apply(0, Array(total)).map((arr, i) => (
                <>
                  <li
                    key={i}
                    className={`page-item ${current === i + 1 ? "active" : ""}`}
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => handlePagination(i + 1)}
                    >
                      {i + 1}
                    </a>
                  </li>
                </>
              ))}
            </>
          ) : current % 5 >= 0 && current > 4 && current + 2 < total ? (
            <>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePagination(1)}
                >
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link disabled" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePagination(current - 1)}
                >
                  {current - 1}
                </a>
              </li>
              <li className="page-item active">
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePagination(current)}
                >
                  {current}
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePagination(current + 1)}
                >
                  {current + 1}
                </a>
              </li>
              <li className="page-item">
                <a className="page-link disabled" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePagination(total)}
                >
                  {total}
                </a>
              </li>
            </>
          ) : current % 5 >= 0 && current > 4 && current + 2 >= total ? (
            <>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePagination(1)}
                >
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link disabled" href="#">
                  ...
                </a>
              </li>
              <li
                className={`page-item ${current === total - 3 ? "active" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePagination(total - 3)}
                >
                  {total - 3}
                </a>
              </li>
              <li
                className={`page-item ${current === total - 2 ? "active" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePagination(total - 2)}
                >
                  {total - 2}
                </a>
              </li>
              <li
                className={`page-item ${current === total - 1 ? "active" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePagination(total - 1)}
                >
                  {total - 1}
                </a>
              </li>
              <li className={`page-item ${current === total ? "active" : ""}`}>
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePagination(total)}
                >
                  {total}
                </a>
              </li>
            </>
          ) : (
            <>
              {Array.apply(0, Array(5)).map((arr, i) => (
                <Fragment key={i}>
                  <li
                    className={`page-item ${current === i + 1 ? "active" : ""}`}
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => handlePagination(i + 1)}
                    >
                      {i + 1}
                    </a>
                  </li>
                </Fragment>
              ))}
              <li className="page-item">
                <a className="page-link disabled" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePagination(total)}
                >
                  {total}
                </a>
              </li>
            </>
          )}
          <li className="page-item">
            <a
              className={`page-link ${
                current === total ? "disabled" : current < total ? "" : ""
              }`}
              href="#"
              onClick={() => handlePagination(current + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default memo(Pagination);
