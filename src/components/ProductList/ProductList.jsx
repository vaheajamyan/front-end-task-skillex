import React from 'react';
import EachProductCard from "../EachProductCard";
import styles from "./ProductList.module.css";

function ProductList({products}) {
    return (
        <div className={styles.container}>
            {products.map((product) => (
                <EachProductCard key={product.id} product={product}/>
            ))}
        </div>

    );
}

export default ProductList;
