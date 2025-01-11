import { useEffect, useState } from "react";
import clsx from "clsx";

const Grid = () => {
    const [isHover, setIsHover] = useState(false);
    const [hoverID, setHoverID] = useState("");
    const [hex, setHex] = useState("#b8b2ad");

    useEffect(() => {
        if (isHover) {
            setHex("#57534e");
        } else {
            setHex("#b8b2ad");
        }
    }, [isHover]);

    const handleHover = (id: string) => {
        setIsHover(!isHover);
        setHoverID(id);
    };

    return (
        <div className="grid grid-cols-5 md:grid-cols-6 gap-x-4 gap-y-4 [&>*:nth-child(6n)]:hidden [&>*:nth-child(6n)]:md:block">
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />

            <NAN {...{ hex, isHover }} />
            <Link
                id="about"
                hoverID={hoverID}
                isHover={isHover}
                handleHover={handleHover}
            />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />

            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />

            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />

            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <Link
                id="research"
                hoverID={hoverID}
                isHover={isHover}
                handleHover={handleHover}
            />
            <NAN {...{ hex, isHover }} />

            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />

            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <Link
                id="exp"
                hoverID={hoverID}
                isHover={isHover}
                handleHover={handleHover}
            />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />

            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />

            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
            <NAN {...{ hex, isHover }} />
        </div>
    );
};

export default Grid;

const NAN = ({ hex, isHover }: { hex: string; isHover: boolean }) => {
    return (
        <p className={clsx(isHover ? "text-stone-600" : "text-gray-xyn")}>
            {hex}
        </p>
    );
};

interface LinkParams {
    id: string;
    hoverID: string;
    isHover: boolean;
    handleHover: (id: string) => void;
}

const Link = ({ id, hoverID, isHover, handleHover }: LinkParams) => {
    return (
        <a
            id={id}
            href={`/${id}`}
            className={clsx(
                isHover && hoverID !== id && "text-opacity-50",
                "text-blue-xyn underline underline-offset-4"
            )}
            onMouseEnter={(e) => handleHover(e.currentTarget.id)}
            onMouseLeave={(e) => handleHover(e.currentTarget.id)}
        >
            /{id}
        </a>
    );
};
