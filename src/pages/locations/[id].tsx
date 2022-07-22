import type { NextPage, GetServerSideProps } from "next";
import ApiCall from "../../infrastructure/services/axios";
import dynamic from "next/dynamic";
import { ICharacters, IPayload } from "../../infrastructure/interface";
import CharacterCard from "../../components/specifics/characterCard";
const Error = dynamic(() => import("../../components/specifics/error"));
export const handler: any = (req: any, res: any) => {
  res.setHeader("Cache-Control", "s-maxage=2");
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, res, req } = context;
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=2, stale-while-revalidate=600"
  );

  let characterId: any = [];
  let payload: IPayload = {
    data: {
      location: {},
      episodes: [],
    },
    statusCode: 200,
    errorMessage: "",
  };
  try {
    await ApiCall({
      url: `location/${query.id}`,
    })
      .then((res) => {
        payload.data = {
          ...payload.data,
          location: res,
        };
      })
      .catch(({ status, statusText }) => {
        payload.statusCode = status;
        payload.errorMessage = statusText;
      });
    characterId = payload.data.location?.residents?.map(
      (epi: string) => epi.split("/")[epi.split("/").length - 1]
    );
    if (characterId.length > 0)
      await ApiCall({
        url: `character/${characterId.join()}`,
      })
        .then((res) => {
          payload.data = {
            ...payload.data,
            characters: res.length > 1 ? res : [res],
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

const DetailLocation: NextPage = ({ payload }: any) => {
  const {
    data: { location, characters },
    statusCode,
    errorMessage,
  }: any = payload;
  if (statusCode != 200)
    return <Error statusCode={statusCode} message={errorMessage} />;
  return (
    <div className="col bg-white mx-3 p-3 rounded-3">
      <div className="row mb-3">
        <h1 className="text-center  text-muted mb-3">
          Location :<span className="text-dark"> {location?.name}</span>
        </h1>
        <h5 className="text-center  text-muted">
          Dimension :<span className="text-dark">{location?.dimension}</span>
        </h5>
        <h5 className="text-center  text-muted">
          Type :<span className="text-dark">{location?.type}</span>
        </h5>
      </div>

      <div>
        <h5 className="border-top py-3">Charcaters of {location?.name}</h5>
      </div>
      <div className="col row">
        {characters?.map((character: ICharacters) => (
          <div className="col-md-4 my-2" key={character.id}>
            <CharacterCard {...character} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailLocation;
