import React, { useState, useEffect, FormEvent } from "react";
import { useCookies } from "react-cookie";
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
  const [cookies, setCookie] = useCookies(["favorite"]);
  const [favorite, setFavorite] = useState({});
  useEffect(() => {
    if (!cookies.favorite) {
      setCookie("favorite", favorite);
    }
  }, []);
  const updateMyValue = () => {
    setCookie("favorite", { id, name });
    setFavorite({ id, name });
  };
  return (
    <a className="card p-3 mb-2 cursor-pointer" href={`/characters/${id}`}>
      <div className="col d-flex justify-content-between align-items-center px-2 py-3">
        <div>
          <img
            className={`rounded-circle ${styles["chracter-img"]}`}
            src={image}
          />
        </div>
        <div className="col-8 px-2 d-flex flex-column">
          <span
            className="fs-4 text-truncate"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={name}
          >
            {name}
          </span>
          <div className="text-muted">
            <span>{species} - </span>
            <span>{gender} - </span>
            <span>{status} </span>
          </div>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            updateMyValue();
          }}
        >
          <BookMark
            color={name === cookies?.favorite?.name ? "#0a58ca" : "#00000042"}
          />
        </div>
      </div>
      <div className="col d-flex flex-column border-top mx-2 py-3">
        <div>
          <span className="px-1 text-capitalize text-muted fs-6">origin:</span>
          <span className="text-capitalize fs-5">{origin?.name}</span>
        </div>
        <div>
          <span className="px-1 text-capitalize text-muted fs-6">
            location:
          </span>
          <span className="text-capitalize fs-5">{location?.name}</span>
        </div>
      </div>
    </a>
  );
};

export default CharacterCard;
