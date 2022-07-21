import React from "react";
import BookMark from "../../../assets/icons/bookmark";
import styles from "./CharacterCard.module.css";
import { ICharacters } from "../../../infrastructure/interface";

const CharacterCard = ({
  id,
  image,
  name,
  status = "unknown",
  species,
  gender,
  origin,
  location,
}: ICharacters) => {
  return (
    <a className="card p-3 mb-2" href={`/characters/${id}`}>
      <div className="col d-flex justify-content-between align-items-center px-2 py-3">
        <div>
          <img
            className={`rounded-circle ${styles["chracter-img"]}`}
            src={image}
          />
        </div>
        <div className="col-8 px-2 d-flex flex-column">
          <div>{name}</div>
          <div className="text-muted">
            <span>{species} - </span>
            <span>{gender} - </span>
            <span>{status} </span>
          </div>
        </div>
        <div>
          <BookMark />
        </div>
      </div>
      <div className="col d-flex flex-column border-top mx-2 py-3">
        <div>
          <span className="px-1 text-capitalize">origin:</span>
          <span className="text-capitalize">{origin?.name}</span>
        </div>
        <div>
          <span className="px-1 text-capitalize">location:</span>
          <span className="text-capitalize">{location?.name}</span>
        </div>
      </div>
    </a>
  );
};

export default CharacterCard;
