import React from "react";
import Link from "next/link";
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
      <Link href="/">
        <a className={`${style["siderbar-link"]}`}>
          <HomeIcon color={router.pathname === "/" ? "#0a58ca" : "#000"} />
        </a>
      </Link>
      <Link href="/locations">
        <a className={`${style["siderbar-link"]}`}>
          <LocationIcon
            color={router.pathname === "/locations" ? "#0a58ca" : "#000"}
          />
        </a>
      </Link>
    </aside>
  );
};

export default Sidebar;
