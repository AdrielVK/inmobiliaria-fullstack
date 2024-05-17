import React from "react";
import empty from "@/assets/empty.svg";
import './errors.css';

interface EmptyProps {
    text:string;
}

const Empty: React.FC<EmptyProps> = ({
    text
}) => {
    return (
        <div className="cont-empty">
            <div className="back">

            <img src={empty} className="empty-img" alt="empty image" />
            <p className="text-empty">{text}</p>
            </div>
        </div>
    )
}

export default Empty;