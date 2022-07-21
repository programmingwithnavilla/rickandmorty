import { useEffect, useState } from "react";

interface IPagination {
  pageSize?: number;
  totalCount: number;
  currentPage: number;
  returnCurrentPage: Function;
}
const Pagination = ({
  pageSize = 20,
  totalCount = 5,
  returnCurrentPage,
  currentPage = 1,
}: IPagination) => {
  Array.from(Array(3).keys());
  // [...Array(pageSize).keys()]
  const [numbers, setNumbers] = useState([
    ...Array.from(Array(pageSize).keys()),
  ]);

  useEffect(() => {
    returnCurrentPage(numbers[1]);
  }, [numbers]);
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item">
          <a
            className={`page-link ${numbers[0] === 0 ? "disabled" : ""}`}
            href="#"
            onClick={() => {
              setNumbers([...Array.from(Array(pageSize).keys())]);
            }}
          >
            First
          </a>
        </li>
        <li className="page-item">
          <a
            className={`page-link ${numbers[0] === 0 ? "disabled" : ""}`}
            href="#"
            onClick={() => {
              setNumbers(
                Array.from(
                  {
                    length: pageSize,
                  },
                  (v, k) => numbers[k] - pageSize
                )
              );
            }}
          >
            Previous
          </a>
        </li>
        {numbers.map((item) => (
          <li
            key={item}
            className={`page-item ${currentPage === item + 1 ? "active" : ""}`}
            onClick={() => {
              returnCurrentPage(item + 1);
            }}
          >
            <a className="page-link" href="#">
              {item + 1}
            </a>
          </li>
        ))}

        <li className="page-item">
          <a
            className={`page-link ${
              numbers[numbers.length - 1] === totalCount ? "disabled" : ""
            }`}
            href="#"
            onClick={() => {
              setNumbers(
                Array.from(
                  {
                    length:
                      numbers[numbers.length - 1] + pageSize <= totalCount
                        ? pageSize
                        : totalCount % pageSize,
                  },
                  (v, k) => k + numbers[numbers.length - 1] + 1
                )
              );
            }}
          >
            Next
          </a>
        </li>
        <li className="page-item">
          <a
            className={`page-link ${
              numbers[numbers.length - 1] === totalCount ? "disabled" : ""
            }`}
            href="#"
            onClick={() => {
              setNumbers(
                Array.from(
                  {
                    length:
                      numbers[numbers.length - 1] + pageSize <= totalCount
                        ? pageSize
                        : totalCount % pageSize,
                  },
                  (v, k) => totalCount - pageSize + k + 1
                )
              );
            }}
          >
            Last
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
