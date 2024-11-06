import styles from "./EachProductCard.module.css";
import React from "react";

function EachProductCard({product}) {
    return (
        <div className={styles.container}>
            <img src={product.imageUrl} alt={product.name}/>
            <h4>{product.name}</h4>
            <p>Category: {product.category}</p>
            <p>Brand: {product.brand}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
        </div>
    )
}

export default EachProductCard;