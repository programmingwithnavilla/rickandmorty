import React, { memo } from "react";
import styles from "./EpisodeCard.module.css";
import { IEpisodes } from "../../../infrastructure/interface";
const EpisodeCard = ({ air_date, episode, name }: IEpisodes) => (
  <>
    <div className="col card flex-row align-items-center p-2">
      <div
        className={`d-flex align-items-center justify-content-center rounded-circle ${styles.bgEpisode} ${styles.episodeCard}`}
      >
        <span>{name.substring(0, 2)}</span>
      </div>
      <div className="w-75 d-flex px-2 flex-column">
        <span
          className="fs-5 text-truncate"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={name}
        >
          {name}
        </span>
        <span>{episode}</span>
        <span>{air_date}</span>
      </div>
    </div>
  </>
);
export default memo(EpisodeCard);
