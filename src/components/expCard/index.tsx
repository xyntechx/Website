import { Component, Show, createSignal } from "solid-js";
import type { IExperience } from "../../../utils/types";
import styles from "./styles.module.css";

interface IProps {
    exp: IExperience;
}

const ExpCard: Component<IProps> = ({ exp }) => {
    const [isExpanded, setIsExpanded] = createSignal(false);

    return (
        <div class={styles.exp}>
            <h3>{exp.position}</h3>
            <h4>{exp.org}</h4>
            <sub>
                {exp.startDate} - {exp.endDate}
            </sub>
            <Show when={exp.responsibilities.length > 0 && !isExpanded()}>
                <button onClick={() => setIsExpanded(true)}>
                    Read More &#9660;
                </button>
            </Show>
            <Show when={exp.responsibilities.length > 0 && isExpanded()}>
                <button onClick={() => setIsExpanded(false)}>
                    Read Less &#9650;
                </button>
            </Show>
            <Show when={isExpanded()}>
                <ul>
                    {exp.responsibilities.map((item) => (
                        <li>{item}</li>
                    ))}
                </ul>
            </Show>
        </div>
    );
};

export default ExpCard;
