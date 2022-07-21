import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import withLoading from "../Hoc/Loading";
import { useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../hooks/redux-hooks";
import ApiCall from "../infrastructure/services/axios";
import { IError } from "../infrastructure/interface";

const Pagination = dynamic(() => import("../components/specifics/pagination"));
const CharacterCard = dynamic(
  () => import("../components/specifics/characterCard")
);
const Error = dynamic(() => import("../components/specifics/error"));
const Dropdown = dynamic(() => import("../components/specifics/dropdown"));
import {
  setCharacter,
  clearCharacter,
  selectCharacter,
} from "../store/features/charactersSlice";
import { RootState } from "../store/index";

export const getServerSideProps = async (context: any) => {
  const { query, res, req } = context;
  console.log("context", query);

  let result = null;
  let error: IError = {
    message: "",
    statusCode: 0,
  };
  try {
    await ApiCall({
      url: `character/?page=${query.page || 1}&name=&status=&gender=&species`,
    })
      .then((res) => {
        result = res;
      })
      .catch(({ status, statusText }) => {
        error.statusCode = status;
        error.message = statusText;
      });
    console.log("result---", result);
    return {
      props: {
        characters: result,
      },
    };
  } catch {
    return {
      props: {
        characters: result,
        error,
      },
    };
  }
};
const Home: NextPage = (props) => {
  const { characters, errorCode, error }: any = props;
  const dispatch = useAppDispatch();
  const test: any = useAppSelector(selectCharacter);
  const [name, setName] = useState("a");
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
  console.log("characters", characters);
  if (error)
    return <Error statusCode={error.statusCode} message={error.message} />;
  return (
    <div className={"col bg-white mx-3 p-3 rounded-3"}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="col d-flex flex-column">
        {/* <Dropdown /> */}
        {/* <div>
          <Dropdown
            label={"React Select"}
            placeholder="Pick one"
            options={[
              { value: "Rock" },
              { value: "Paper" },
              { value: "Scissors" },
            ]}
          />
          <span style={{ display: "inline-block", width: 20 }} />
          <Dropdown
            label="React Multiple Select"
            placeholder="Pick some"
            options={[
              { value: "Rock" },
              { value: "Paper" },
              { value: "Scissors" },
            ]}
            multiple
          />
        </div> */}
        <div className="col row">
          {characters?.results?.map((character: any) => (
            <div className="col-md-4 my-2" key={character.id}>
              <CharacterCard {...character} />
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center my-3">
          <Pagination
            totalCount={characters?.info?.count}
            currentPage={page}
            returnCurrentPage={(pge: any) => handlePagination(pge)}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
