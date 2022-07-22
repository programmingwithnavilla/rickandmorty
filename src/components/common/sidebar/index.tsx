import React from "react";
import HomeIcon from "../../../assets/icons/homeIcon";
import LocationIcon from "../../../assets/icons/locationIcon";
import style from "./Sidebar.module.css";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  return (
    <aside
      id="sidebar"
      className={`d-flex flex-column align-items-center ${style["app-sidebar"]}`}
    >
      <a href="/" className={`${style["siderbar-link"]}`}>
        <HomeIcon color={router.pathname === "/" ? "#0a58ca" : "#000"} />
      </a>
      <a href="/locations" className={`${style["siderbar-link"]}`}>
        <LocationIcon
          color={router.pathname === "/locations" ? "#0a58ca" : "#000"}
        />
      </a>
    </aside>
  );
};

export default Sidebar;
