import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import ApiCall from "../../infrastructure/services/axios";
import { Characters } from "../../infrastructure/interface";
import EpisodeCard from "../../components/specifics/episodeCard";
import { IEpisodes } from "../../infrastructure/interface";
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
  await ApiCall({
    url: `character/${query.id}`,
  })
    .then((res) => {
      result = res;
    })
    .catch((err) => console.log("apo call", err));
  episodeId = result?.episode?.map(
    (epi: string) => epi.split("/")[epi.split("/").length - 1]
  );
  if (episodeId.length > 0)
    await ApiCall({
      url: `episode/${episodeId.join()}`,
    })
      .then((res) => (episodes = res))
      .catch((err) => console.log("apo call", err));

  console.log("result---", episodeId);

  return {
    props: {
      character: result,
      episodes,
    },
  };
};

const DetailCharacters: NextPage = (props) => {
  const { character, episodes }: any = props;
  console.log("episodes", episodes);
  return (
    <div className="col d-flex flex-column bg-white rounded-3 mx-3 p-3">
      <div className="d-flex">
        <div>
          <img className="rounded-3" src={character.image} />
        </div>
        <div className="d-flex flex-column px-3">
          <span className="h2">{character.name}</span>
          <span>{character.status}</span>
          <span>{character.species}</span>
          <span>{character.gender}</span>
          <span>{character.type}</span>
          <span>{character.location?.name}</span>
          <span>{character.origin?.name}</span>
          <span>{new Date(character.created).toDateString()}</span>
        </div>
      </div>
      <div className="col row my-2">
        {/* EpisodeCard */}
        <div>
          <h5 className="my-3 pt-3 border-top">
            Episodes of {character?.name}:
          </h5>
        </div>
        {episodes?.map((episode: IEpisodes) => {
          return (
            <div key={episode.id} className="col-md-3 my-3">
              <EpisodeCard {...episode} />
              {/* <div className="d-flex card p-2">
                <div>{name.substring(0, 2)}</div>
                <div>
                  <span>{name}</span>
                  <span>{air_date}</span>
                  <span>{episode}</span>
                </div>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailCharacters;
