import type { NextPage, GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import ApiCall from "../../infrastructure/services/axios";
import { IEpisodes, IError } from "../../infrastructure/interface";
const Error = dynamic(() => import("../../components/specifics/error"));
const EpisodeCard = dynamic(
  () => import("../../components/specifics/episodeCard")
);
export const handler: any = (req: any, res: any) => {
  res.setHeader("Cache-Control", "s-maxage=10");
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, res, req } = context;
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  let result: any = null;
  let episodes: IEpisodes[] = [];
  let episodeId: any = [];
  let error: IError = {
    message: "",
    statusCode: 0,
  };
  try {
    await ApiCall({
      url: `character/${query.id}`,
    })
      .then((res) => {
        result = res;
      })
      .catch(({ status, statusText }) => {
        error.statusCode = status;
        error.message = statusText;
      });
    episodeId = result?.episode?.map(
      (epi: string) => epi.split("/")[epi.split("/").length - 1]
    );
    if (episodeId.length > 0)
      await ApiCall({
        url: `episode/${episodeId.join()}`,
      })
        .then((res) => {
          if (res.length > 1) episodes = res;
          else episodes.push(res);
        })
        .catch(({ status, statusText }) => {
          error.statusCode = status;
          error.message = statusText;
        });
    return {
      props: {
        character: result,
        episodes,
        error,
      },
    };
  } catch {
    return {
      props: {
        character: result,
        episodes,
        error,
      },
    };
  }
};

const DetailCharacters: NextPage = (props) => {
  const { character, episodes, error }: any = props;
  console.log("error", error);
  console.log("episodes", episodes);

  if (error)
    return <Error statusCode={error.statusCode} message={error.message} />;
  return (
    <div className="col d-flex flex-column bg-white rounded-3 mx-3 p-3">
      <div className="d-flex">
        <div>
          <img className="rounded-3" src={character.image} />
        </div>
        <div className="d-flex flex-column px-3">
          <span className="fs-1">{character.name || "---"}</span>
          <div>
            <span className="px-1 text-capitalize text-muted fs-6">
              status:
            </span>
            <span className="text-capitalize fs-5">
              {character.status || "---"}
            </span>
          </div>
          <div>
            <span className="px-1 text-capitalize text-muted fs-6">
              species:
            </span>
            <span className="text-capitalize fs-5">
              {character.species || "---"}
            </span>
          </div>
          <div>
            <span className="px-1 text-capitalize text-muted fs-6">
              gender:
            </span>
            <span className="text-capitalize fs-5">
              {character.gender || "---"}
            </span>
          </div>
          <div>
            <span className="px-1 text-capitalize text-muted fs-6">type:</span>
            <span className="text-capitalize fs-5">
              {character.type || "---"}
            </span>
          </div>
          <div>
            <span className="px-1 text-capitalize text-muted fs-6">
              location:
            </span>
            <span className="text-capitalize fs-5">
              {character.location?.name || "---"}
            </span>
          </div>
          <div>
            <span className="px-1 text-capitalize text-muted fs-6">
              origin:
            </span>
            <span className="text-capitalize fs-5">
              {character.origin?.name || "---"}
            </span>
          </div>
          <div>
            <span className="px-1 text-capitalize text-muted fs-6">
              created at:
            </span>
            <span className="text-capitalize fs-5">
              {new Date(character.created).toDateString() || "---"}
            </span>
          </div>
        </div>
      </div>
      <div className="col row my-2">
        <div>
          <h3 className="my-3 pt-3 border-top">
            Episodes of {character?.name}:
          </h3>
        </div>
        {episodes.length > 0 &&
          episodes.map((episode: IEpisodes) => (
            <div key={episode.id} className="col-md-3 my-3">
              <EpisodeCard {...episode} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DetailCharacters;
