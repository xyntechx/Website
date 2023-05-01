import type { Component } from "solid-js";
import styles from "./styles.module.css";

const Topnav: Component = () => {
    return (
        <header class={styles.header}>
            <p class={styles.text}>
                Hello, World!
            </p>
            {/* as we enter the diff sections, the text will change */}
        </header>
    );
};

export default Topnav;
