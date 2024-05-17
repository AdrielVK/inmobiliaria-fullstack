import React from "react";
import './MessageComponents.css';
import { MessageInterface } from "@/Interfaces";

const Message: React.FC<MessageInterface> = ({
    text, type
}) => {
    return (
        <div className={`message-${type} show`}>
            <p className={`text-${type}`}>{text}</p>
        </div>
    );
};

export default Message