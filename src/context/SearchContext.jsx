// src/context/SearchContext.jsx
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Saare products combine krne ke liye
  const [allWebsiteProducts, setAllWebsiteProducts] = useState([]);

  const searchProducts = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const lower = query.toLowerCase();

    const filtered = allWebsiteProducts.filter((p) =>
      p.title.toLowerCase().includes(lower)
    );

    setSearchResults(filtered);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        searchResults,
        searchProducts,
        allWebsiteProducts,
        setAllWebsiteProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
