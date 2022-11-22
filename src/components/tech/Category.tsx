import styles from "./Tech.module.css";

interface Props {
    shown: number;
    index: number;
    items: string[];
}

const Category = ({ shown, index, items }: Props) => {
    return (
        <ul
            style={{ display: shown === index ? "flex" : "none" }}
            className={styles.list}
        >
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
};

export default Category;
