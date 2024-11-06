import React from 'react';
import {ClipLoader} from "react-spinners";
import styles from "./Spinner.module.css";

function Spinner() {
    return (
        <div className={styles.fade}>
            <ClipLoader
                color={'green'}
                loading
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

export default Spinner;
