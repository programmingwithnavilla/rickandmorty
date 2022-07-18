import type { NextPage } from "next";
import { useRouter } from "next/router";

const DetailCharacters: NextPage = () => {
  const router = useRouter();
  console.log("----router.query----", router.query);
  const { id } = router.query;
  return <div>Detail: {id}</div>;
};

export default DetailCharacters;
