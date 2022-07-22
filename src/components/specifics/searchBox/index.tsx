import React from "react";
import SearchIcon from "../../../assets/icons/search";
import style from "./searchbox.module.css";
import { ISearchBox } from "../../../infrastructure/interface/component";

const SearchBox = ({ value, onChange, placeholder = "Search" }: ISearchBox) => {
  return (
    <div className={`border ${style["search-wrapper"]} rounded-3`}>
      <input
        className={`${style["search-input"]}`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
      />
      <SearchIcon />
    </div>
  );
};

export default SearchBox;
