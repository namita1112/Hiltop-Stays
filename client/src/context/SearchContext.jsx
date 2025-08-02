import { createContext, useState, useContext } from "react";

const SearchContext = createContext();
export const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({
    destination: '',
    date: [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }
    ],
    options: { adult: 1, children: 0, room: 1 },
  });

  return (
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
