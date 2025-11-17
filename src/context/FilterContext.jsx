// src/context/FilterContext.jsx
import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children, products = [] }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState(4);
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <FilterContext.Provider
      value={{
        isFilterOpen,
        setIsFilterOpen,
        gridCols,
        setGridCols,
        products,
        filteredProducts,
        setFilteredProducts,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);