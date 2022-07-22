import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../hooks/redux-hooks";
import ApiCall from "../infrastructure/services/axios";
import { IPayload } from "../infrastructure/interface";
import { Gender, Species, StatusType } from "../utils/filterValue";
import { enumToArray, getCookie, setCookie } from "../utils/index";

const Dropdown = dynamic(() => import("../components/specifics/dropdown"));
const Button = dynamic(() => import("../components/specifics/button"));
const SearchBox = dynamic(() => import("../components/specifics/searchBox"));
const Pagination = dynamic(() => import("../components/specifics/pagination"));
const CharacterCard = dynamic(
  () => import("../components/specifics/characterCard")
);
const Error = dynamic(() => import("../components/specifics/error"));
import {
  setCharacter,
  clearCharacter,
  selectCharacter,
} from "../store/features/charactersSlice";
import { RootState } from "../store/index";

export const handler: any = (req: any, res: any) => {
  console.log("-----handler-----");
  res.setHeader("Cache-Control", "s-maxage=10");
};
export const getServerSideProps = async (context: any) => {
  const {
    query: { page = 1, name, status, gender, species },
    res,
    req,
  } = context;
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=5, stale-while-revalidate=600"
  );

  let payload: IPayload = {
    data: {
      locations: {},
    },
    statusCode: 200,
    errorMessage: "",
  };
  let url = `character/?page=${page}`;
  if (name) url += `&name=${name}`;
  if (status) url += `&status${status}`;
  if (gender) url += `&gender${gender}`;
  if (species) url += `&species${species}`;

  setCookie(res, req, "test", "ali");
  console.log("Asasas", getCookie(res, req, "test"));
  // url: `character/?page=${query.page || 1}&name=&status=&gender=&species`,

  try {
    await ApiCall({
      url: url,
    })
      .then((res) => {
        payload.data = {
          ...payload.data,
          characters: res,
        };
      })
      .catch(({ status, statusText }) => {
        payload.statusCode = status;
        payload.errorMessage = statusText;
      });
    return {
      props: {
        payload,
        cookie: { setCookie, getCookie },
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
const Home: NextPage = ({ payload }: any) => {
  // const { characters, error }: any = props;
  const {
    data: { characters },
    statusCode,
    errorMessage,
  }: any = payload;
  const [searchValue, setSearchvalue] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");

  const [page, setPage] = useState(1);
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
    if (gender) query.gender = gender.toString();
    if (status) query.status = status.toString();
    if (species) query.species = species.toString();
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
    setGender("");
    setStatus("");
    setSpecies("");
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
    <div className={"col bg-white mx-3 p-3 rounded-3"}>
      <Head>
        <title>Character</title>
        <meta name="description" content="Character Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* filter panel */}
      <div className="d-flex my-3">
        <div className="col-2 mx-1">
          <Dropdown
            placeholder="Species"
            options={enumToArray(Species)}
            value={species}
            onChange={(item: any) => {
              setSpecies(item);
            }}
          />
        </div>
        <div className="col-2 mx-1">
          <Dropdown
            placeholder="Status"
            options={enumToArray(StatusType)}
            value={species}
            onChange={(item: any) => {
              setStatus(item);
            }}
          />
        </div>
        <div className="col-2 mx-1">
          <Dropdown
            placeholder="Gender"
            options={enumToArray(Gender)}
            value={gender}
            onChange={(item: any) => {
              setGender(item);
            }}
          />
        </div>
        <div className="col-6 mx-1 d-flex align-items-center">
          <div className="col-8">
            <SearchBox value={searchValue} onChange={searchOnchnage} />
          </div>
          <Button
            label="Reset"
            className="btn-outline-danger mx-2"
            onClick={resetFilter}
          />
          <Button
            label="Search"
            className="btn-outline-primary mx-3"
            disabled={!searchValue && !gender && !status && !species}
            onClick={filter}
          />
        </div>
      </div>
      <main className="col d-flex flex-column">
        <div className="col row">
          {characters?.results?.map((character: any) => (
            <div className="col-md-4 my-2" key={character.id}>
              <CharacterCard {...character} />
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center my-3">
          <Pagination
            total={characters?.info?.pages}
            current={page}
            pagination={(pge: any) => handlePagination(pge)}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
