import { useTranslation } from "react-i18next";
import search from "../../assets/search.svg";
import "./ItemsList.css";
import ItemTree from "../ItemTree/ItemTree";

type propsType = {};

const ItemsList = ({}: propsType) => {
  const { t } = useTranslation();
  let searchTerm = "";

  const onSearch = () => {
    if (!searchTerm) return;
    console.log("searchTerm", searchTerm);
  };

  return (
    <div className="ItemsList">
      <div className="searchbar-container">
        <input
          type="text"
          placeholder={t("search-placeholder")}
          alt="search"
          autoFocus
          name="search bar"
          id="searchBar"
          onChange={(event) => (searchTerm = event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && onSearch()}
        />
        <button className="searchButton" onClick={() => onSearch()}>
          <img src={search} alt="search" />
        </button>
      </div>
      <ItemTree />
    </div>
  );
};

export default ItemsList;
