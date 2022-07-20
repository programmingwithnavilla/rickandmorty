import React from "react";
import { IEpisodes } from "../../../infrastructure/interface";
import styles from "./EpisodeCard.module.css";
const EpisodeCard = ({ air_date, episode, name }: IEpisodes) => {
  return (
    <>
      <div className="col card flex-row align-items-center p-2">
        <div
          className={`d-flex align-items-center justify-content-center rounded-circle bg-secondary text-white ${styles.episodeCard}`}
        >
          Pi
        </div>
        <div className="w-75 d-flex px-2 flex-column">
          <span className="text-truncate">{name}</span>
          <span>{episode}</span>
          <span>{air_date}</span>
        </div>
      </div>
    </>
  );
};

export default EpisodeCard;
