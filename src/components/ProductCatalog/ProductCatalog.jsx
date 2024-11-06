import React, { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import FilterPanel from '../FilterPanel/FilterPanel';
import ProductList from '../ProductList';
import Spinner from '../Spinner';
import {useProducts} from "../../hooks/useProducts";
import styles from "./ProductCatalog.module.css";
import {getFiltersFromLocalStorage, setFiltersToLocalStorage} from "../../services/localStorageService";

const initialFilters = {
  category: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
  rating: '',
}

function ProductCatalog() {
  const [filters, setFilters] = useState(getFiltersFromLocalStorage() || initialFilters);
  const debouncedFilters = useDebounce(filters, 300);
  const {isLoading, response: products} = useProducts(debouncedFilters)

  const updateFilter = (key, value) => {
    setFilters((prevFilters) => {
      const temp = ({ ...prevFilters, [key]: value });

      setFiltersToLocalStorage(temp);

      return temp
    });
  };
  const resetFilters = () => {
    setFilters(initialFilters);
    setFiltersToLocalStorage(initialFilters);

  }

  return (
    <div className={styles.container}>
      <FilterPanel filters={filters} updateFilter={updateFilter} resetFilters={resetFilters} />
      {isLoading ? (
        <Spinner />
      ) : products.length ? (
        <ProductList products={products} />
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

export default ProductCatalog;
