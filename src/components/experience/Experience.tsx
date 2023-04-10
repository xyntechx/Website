import { useState } from "react";
import styles from "./Experience.module.css";

interface Props {
    experience: {
        role: string;
        organisation: string;
        startDate: string;
        endDate: string;
        responsibilities: string[];
    };
}

const Experience = ({ experience }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={styles.experience}>
            <h3 className={styles.role}>{experience.role}</h3>
            <h3 className={styles.organisation}>{experience.organisation}</h3>
            <sub className={styles.date}>
                {experience.startDate} - {experience.endDate}
            </sub>
            {experience.responsibilities.length > 0 && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={styles.readmore}
                >
                    {isExpanded ? "Read Less \u25B2" : "Read More \u25BC"}
                </button>
            )}
            {isExpanded && (
                <>
                    {experience.responsibilities.map((item) => (
                        <p key={item} className={styles.responsibilities}>
                            + {item}
                        </p>
                    ))}
                </>
            )}
        </div>
    );
};

export default Experience;
