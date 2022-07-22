import dynamic from "next/dynamic";
import ApiCall from "../../infrastructure/services/axios";
import { Ilocations, IPayload } from "../../infrastructure/interface";
import type { NextPage } from "next";
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { LocationType } from "../../utils/filterValue";
import { enumToArray } from "../../utils/index";

const Error = dynamic(() => import("../../components/specifics/error"));
const LocationCard = dynamic(
  () => import("../../components/specifics/locationCard")
);
const Dropdown = dynamic(() => import("../../components/specifics/dropdown"));
const Button = dynamic(() => import("../../components/specifics/button"));
const SearchBox = dynamic(() => import("../../components/specifics/searchBox"));
const Pagination = dynamic(
  () => import("../../components/specifics/pagination")
);

export const getServerSideProps = async (context: any) => {
  const {
    query: { page = 1, type, name },
    res,
    req,
  } = context;
  let payload: IPayload = {
    data: {
      locations: {},
    },
    statusCode: 200,
    errorMessage: "",
  };
  let url = `location/?page=${page}`;
  if (name) url += `&name=${name}`;
  if (type) url += `&type${type}`;
  try {
    await ApiCall({
      url: url,
    })
      .then((res) => {
        payload.data = {
          ...payload.data,
          locations: res,
        };
      })
      .catch(({ status, statusText }) => {
        payload.statusCode = status;
        payload.errorMessage = statusText;
      });
    return {
      props: {
        payload,
      },
    };
  } catch {
    return {
      props: {
        payload: {
          ...payload,
          statusCode: 500,
          errorMessage: "Internal Server Error",
        },
      },
    };
  }
};

const Locations: NextPage = ({ payload }: any) => {
  const {
    data: { locations },
    statusCode,
    errorMessage,
  }: any = payload;
  const [page, setPage] = useState(1);
  const [searchValue, setSearchvalue] = useState("");
  const [type, setType] = useState("");

  const router = useRouter();

  const searchOnchnage = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearchvalue(value);
  };
  const handlePagination = (page: number) => {
    const path = router.pathname;
    const query = router.query;
    setPage(page);
    query.page = page.toString();
    router.push({
      pathname: path,
      query: query,
    });
  };
  const filter = () => {
    const path = router.pathname;
    const query = router.query;

    if (searchValue) query.name = searchValue.toString();
    if (type) query.type = type.toString();

    query.page = "1";
    router.push({
      pathname: path,
      query: query,
    });
    resetValue();
  };

  const resetValue = () => {
    setPage(1);
    setSearchvalue("");
    setType("");
  };
  const resetFilter = () => {
    const path = router.pathname;
    let query = router.query;
    resetValue();
    query = { page: page.toString() };
    router.push({
      pathname: path,
      query: query,
    });
  };
  if (statusCode != 200)
    return <Error statusCode={statusCode} message={errorMessage} />;
  return (
    <div className="col d-flex flex-column bg-white mx-3 p-3 rounded-3">
      <div>
        <div className="d-flex my-3">
          <div className="col-md-4 pe-3">
            <Dropdown
              placeholder="Status"
              options={enumToArray(LocationType)}
              value={type}
              onChange={(item: any) => {
                setType(item);
              }}
            />
          </div>
          <div className="col-md-4 px-2">
            <SearchBox value={searchValue} onChange={searchOnchnage} />
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <Button
              label="Reset"
              className="col-4 btn-outline-danger mx-2"
              onClick={resetFilter}
            />
            <Button
              label="Search"
              className="col-4 btn-outline-primary mx-3"
              disabled={!searchValue && !type}
              onClick={filter}
            />
          </div>
        </div>
      </div>
      {/* filter panel */}
      <div className="col row">
        {locations?.results?.map((location: Ilocations) => (
          <a
            key={location.id}
            className="col-md-4 my-2"
            href={`/locations/${location.id}`}
          >
            <LocationCard {...location} />
          </a>
        ))}
      </div>
      <div className="d-flex justify-content-center my-3">
        <Pagination
          total={locations?.info?.count}
          current={page}
          pagination={(pge: any) => handlePagination(pge)}
        />
      </div>
    </div>
  );
};

export default Locations;
