import type { NextPage } from "next";
import dynamic from "next/dynamic";
import ApiCall from "../../infrastructure/services/axios";
import { Ilocations } from "../../infrastructure/interface";
const LocationCard = dynamic(
  () => import("../../components/specifics/locationCard")
);
export const getServerSideProps = async () => {
  let result = null;
  await ApiCall({
    url: "location/?page=1",
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
  console.log("locaitons", locations);
  return (
    <div className="col bg-white mx-3 p-3 rounded-3">
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
    </div>
  );
};

export default Locations;
