import { useEffect, useState, useRef } from "react";
import styles from "./Projects.module.css";

interface Props {
    projects: {
        name: string;
        description: string;
        url: string;
        special: boolean;
    }[];
}

const ProjectCards = ({ projects }: Props) => {
    const [touchStart, setTouchStart] = useState<number>();
    const [touchEnd, setTouchEnd] = useState<number>();
    const [checkTouch, setCheckTouch] = useState(true); // true/false only used as toggle

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(2);

    const [current, setCurrent] = useState(0); // index of focused toggle

    const [transition, setTransition] = useState(true); // true/false only used as toggle
    const [pause, setPause] = useState(false);

    const targets = useRef([...Array(Math.ceil(projects.length / 2)).keys()]);

    const handleTouch = () => {
        if (touchEnd! < touchStart!) {
            // swiped left: forward
            if (current < targets.current.length - 1) handleToggle(current + 1);
            else handleToggle(0);
            setPause(true);
        }

        if (touchEnd! > touchStart!) {
            // swiped right: backward
            if (current > 0) handleToggle(current - 1);
            else handleToggle(targets.current.length - 1);
            setPause(true);
        }
    };

    const handleToggle = (target: number) => {
        setStartIndex(target * 2);
        setEndIndex(target * 2 + 2);
        setCurrent(target);
    };

    useEffect(() => {
        if (!pause) {
            const timer = setTimeout(() => {
                if (current < targets.current.length - 1)
                    handleToggle(current + 1);
                else handleToggle(0);
                setTransition(!transition);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [transition, pause]);

    useEffect(() => {
        handleTouch();
    }, [checkTouch]);

    return (
        <>
            <div
                className={styles.projects}
                onTouchStart={(e) => setTouchStart(e.changedTouches[0].screenX)}
                onTouchEnd={(e) => {
                    setTouchEnd(e.changedTouches[0].screenX);
                    setCheckTouch(!checkTouch);
                }}
            >
                {projects.slice(startIndex, endIndex).map((project) => (
                    <a
                        href={project.url}
                        target="_blank"
                        className={styles.project}
                        style={{
                            backgroundColor: project.special
                                ? "#ffb13d33"
                                : "#ffffff33",
                        }}
                        key={project.name}
                    >
                        <h3 className={styles.name}>{project.name}</h3>
                        <p className={styles.description}>
                            {project.description}
                        </p>
                    </a>
                ))}
            </div>

            <div className={styles.toggleContainer}>
                {targets.current.map((target) => (
                    <button
                        className={styles.toggle}
                        style={{
                            backgroundColor:
                                current === target ? "#ff6633" : "#ff663344",
                        }}
                        onClick={() => {
                            handleToggle(target);
                            setPause(true);
                        }}
                        key={target}
                        aria-label={`See group ${target + 1} of projects`}
                    />
                ))}
            </div>
        </>
    );
};

export default ProjectCards;
