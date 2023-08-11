import { fetchDataFromApi } from "../utils/api";
import { createContext, useState, useEffect } from "react";
const context = createContext();
export const AppContext = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(false);
  const [selectCategories, setSelectCategories] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);
  useEffect(() => {
    fetchSelectedCategoryData(selectCategories);
  }, [selectCategories]);
  const fetchSelectedCategoryData = (query) => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${query}`).then((res) => {
      console.log(res);
    });
  };
  return (
    <context.Provider
      value={{
        loading,
        setLoading,
        searchResults,
        setSearchResults,
        selectCategories,
        setSelectCategories,
        mobileMenu,
        setMobileMenu,
      }}
    >
      {props.children}
    </context.Provider>
  );
};
