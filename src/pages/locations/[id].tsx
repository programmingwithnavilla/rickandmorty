import type { NextPage, GetServerSideProps } from "next";
import ApiCall from "../../infrastructure/services/axios";
import { Ilocations, ICharacters } from "../../infrastructure/interface";
import CharacterCard from "../../components/specifics/characterCard";
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
  let characters: ICharacters[] = [];
  let characterId: any = [];
  await ApiCall({
    url: `location/${query.id}`,
  })
    .then((res) => {
      result = res;
    })
    .catch((err) => console.log("apo call", err));
  characterId = result?.residents?.map(
    (epi: string) => epi.split("/")[epi.split("/").length - 1]
  );
  if (characterId.length > 0)
    await ApiCall({
      url: `character/${characterId.join()}`,
    })
      .then((res) => (characters = res))
      .catch((err) => console.log("apo call", err));

  console.log("result---", characterId);

  return {
    props: {
      location: result,
      characters,
    },
  };
};

const DetailLocation: NextPage = (props) => {
  const { location, characters }: any = props;
  console.log("location", location);
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
