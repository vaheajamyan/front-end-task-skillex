import React from 'react';
import styles from './FilterPanel.module.css';

function FilterPanel({filters, updateFilter, resetFilters}) {
    const hasAnyFilter = Object.keys(filters).some((eachKey) => filters[eachKey] !== "");

    const handleRatingChange = (e) => {
        const {value} = e.target;
        if ((value > 0 && value <= 5) || !value) {
            updateFilter('rating', value)
        }
    }
    return (<div className={styles.container}>
        <h3>Filters</h3>
        <div className={styles.filtersSection}>
            <div className={styles.eachFilter}>
                <label>Category</label>
                <select onChange={(e) => updateFilter('category', e.target.value)} value={filters.category}>
                    <option value="">All</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Clothing">Clothing</option>
                </select>
            </div>
            <div className={styles.eachFilter}>
                <label>Brand</label>
                <select onChange={(e) => updateFilter('brand', e.target.value)} value={filters.brand}>
                    <option value="">All</option>
                    <option value="Brand A">Brand A</option>
                    <option value="Brand B">Brand B</option>
                    <option value="Brand C">Brand C</option>
                    <option value="Brand D">Brand D</option>
                    <option value="Brand E">Brand E</option>
                </select>
            </div>
            <div className={styles.eachFilter}>
                <label>Price Range</label>
                <input
                    type="number"
                    min={0}
                    max={filters.maxPrice || undefined}
                    placeholder="Min"
                    onChange={(e) => updateFilter('minPrice', e.target.value)}
                    value={filters.minPrice || ''}
                />
                <input
                    type="number"
                    min={filters.minPrice || undefined}
                    placeholder="Max"
                    onChange={(e) => updateFilter('maxPrice', e.target.value)}
                    value={filters.maxPrice || ''}
                />
            </div>
            <div className={styles.eachFilter}>
                <label>Rating</label>
                <input
                    type="number"
                    step="0.1"
                    max={5}
                    min={1}
                    onChange={handleRatingChange}
                    value={filters.rating || ''}
                />
            </div>
        </div>
        {hasAnyFilter && <button className={styles.resetButton} onClick={resetFilters}>Clear All</button>}
    </div>);
}

export default FilterPanel;
