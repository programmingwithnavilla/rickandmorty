import React from "react";
import styles from "./LocationCard.module.css";
import { Ilocations } from "../../../infrastructure/interface";

const LocationCard = ({
  id,
  created,
  dimension,
  name,
  residents,
  type,
  url,
}: Ilocations) => {
  return (
    <div className="card p-3 mb-2">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <div
            className={`d-flex align-items-center justify-content-center ${styles.locationIcon}`}
          >
            <span>{name.substring(0, 2)}</span>
          </div>
          <div className="ms-2">
            <h6 className="mb-0">Dimension</h6>
            <span className={styles.locationDimension}>{dimension}</span>
          </div>
        </div>
        <div
          className={`d-flex align-items-center justify-content-center ${styles.locationBadge}`}
        >
          <span className="text-truncate">{type}</span>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="px-2 heading text-truncate">{name}</h3>
        <div className="mt-5">
          <div className={styles.borderGradient} />
          <div className="px-2 mt-3">
            <span>{new Date(created).toDateString()}</span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LocationCard;
