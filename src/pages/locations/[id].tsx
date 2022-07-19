import type { NextPage } from "next";
import { useRouter } from "next/router";

const DetailLocation: NextPage = () => {
  const router = useRouter();
  console.log("----router.query----", router.query);
  const { id } = router.query;
  return <div>Detail DetailLocation: {id}</div>;
};

export default DetailLocation;
