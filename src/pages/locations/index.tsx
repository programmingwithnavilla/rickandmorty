import dynamic from "next/dynamic";
import ApiCall from "../../infrastructure/services/axios";
import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { Ilocations } from "../../infrastructure/interface";
const LocationCard = dynamic(
  () => import("../../components/specifics/locationCard")
);
const Pagination = dynamic(
  () => import("../../components/specifics/pagination")
);

export const getServerSideProps = async (context: any) => {
  const { query, res, req } = context;
  let result = null;
  await ApiCall({
    url: `location/?page=${query.page || 1}`,
  })
    .then((res) => {
      result = res;
    })
    .catch((err) => console.log("apo call", err));
  return {
    props: {
      locations: result,
    },
  };
};

const Locations: NextPage = (props) => {
  const { locations }: any = props;
  const [page, setPage] = useState(1);
  const router = useRouter();
  console.log("locaitons", locations);
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
