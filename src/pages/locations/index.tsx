import dynamic from "next/dynamic";
import ApiCall from "../../infrastructure/services/axios";
import { Ilocations, IPayload } from "../../infrastructure/interface";
import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
const Error = dynamic(() => import("../../components/specifics/error"));
const LocationCard = dynamic(
  () => import("../../components/specifics/locationCard")
);
const Pagination = dynamic(
  () => import("../../components/specifics/pagination")
);

export const getServerSideProps = async (context: any) => {
  const { query, res, req } = context;
  // let result = null;
  let payload: IPayload = {
    data: {
      locations: {},
    },
    statusCode: 200,
    errorMessage: "",
  };
  try {
    await ApiCall({
      url: `location/?page=${query.page || 1}`,
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
  const router = useRouter();

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
  if (statusCode != 200)
    return <Error statusCode={statusCode} message={errorMessage} />;
  return (
    <div className="col d-flex flex-column bg-white mx-3 p-3 rounded-3">
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
          totalCount={locations?.info?.count}
          currentPage={page}
          returnCurrentPage={(pge: any) => handlePagination(pge)}
        />
      </div>
    </div>
  );
};

export default Locations;
