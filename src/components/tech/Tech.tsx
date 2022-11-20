import { useState } from "react";
import styles from "./Tech.module.css";

const Tech = () => {
    const [shown, setShown] = useState(0);
    // 0: CS Fields, 1: Programming Languages, 2: Technologies

    return (
        <section className={styles.container}>
            <nav className={styles.techNav}>
                <h1 className={styles.title}>My Most Loved...</h1>
                <button
                    onClick={() => setShown(0)}
                    style={{
                        backgroundColor:
                            shown === 0 ? "#ff663333" : "#ffffff33",
                    }}
                    className={styles.button}
                >
                    CS Fields
                </button>
                <button
                    onClick={() => setShown(1)}
                    style={{
                        backgroundColor:
                            shown === 1 ? "#ff663333" : "#ffffff33",
                    }}
                    className={styles.button}
                >
                    Programming Languages
                </button>
                <button
                    onClick={() => setShown(2)}
                    style={{
                        backgroundColor:
                            shown === 2 ? "#ff663333" : "#ffffff33",
                    }}
                    className={styles.button}
                >
                    Technologies
                </button>
            </nav>
            <ul
                style={{ display: shown === 0 ? "flex" : "none" }}
                className={styles.list}
            >
                <li>Web Development</li>
                <li>Artificial intelligence</li>
                <li>Quantum Computing</li>
            </ul>
            <ul
                style={{ display: shown === 1 ? "flex" : "none" }}
                className={styles.list}
            >
                <li>Python</li>
                <li>TypeScript/JavaScript</li>
                <li>C#</li>
                <li>Go</li>
                <li>Julia</li>
            </ul>
            <ul
                style={{ display: shown === 2 ? "flex" : "none" }}
                className={styles.list}
            >
                <li>Next.js</li>
                <li>Astro</li>
                <li>Fresh</li>
                <li>Remix</li>
                <li>Nuxt</li>
                <li>Prisma</li>
                <li>Tensorflow + Keras</li>
                <li>OpenCV</li>
                <li>Qiskit</li>
            </ul>
        </section>
    );
};

export default Tech;
