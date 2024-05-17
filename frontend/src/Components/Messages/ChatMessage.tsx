import React from "react";
import './MessageComponents.css';

interface ChatMessage{
    name:string,
    message_count: number,
    content:string,
    onClickAction: React.MouseEventHandler<HTMLLIElement>,
}

const ChatMessage: React.FC<ChatMessage> = ({
    name, message_count, content, onClickAction
}) => {
    return (
        <li onClick={onClickAction} className="inbox-message-list">
        
            <p className="item-chat-inbox strong">{name}</p>
            <p className="item-chat-inbox">{content.length > 35? `${content.slice(0,35)}...` : content}</p>
            <p className="item-chat-inbox strong alert">{message_count}</p>
            
        </li>
    )
}

export default ChatMessage