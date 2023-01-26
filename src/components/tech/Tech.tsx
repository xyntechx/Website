import { useState } from "react";
import Category from "./Category";
import styles from "./Tech.module.css";

const Tech = () => {
    const [shown, setShown] = useState(0);
    // 0: CS Fields, 1: Programming Languages, 2: Technologies

    const fields = [
        "Web Development",
        "Artificial Intelligence",
        "Quantum Computing",
    ];
    const languages = ["Python", "TypeScript/JavaScript", "C#", "Go", "Julia"];
    const tech = [
        "Next.js",
        "Astro",
        "Remix",
        "Supabase",
        "Tensorflow + Keras",
        "OpenCV",
        "Qiskit",
    ];

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
            <Category shown={shown} index={0} items={fields} />
            <Category shown={shown} index={1} items={languages} />
            <Category shown={shown} index={2} items={tech} />
        </section>
    );
};

export default Tech;
