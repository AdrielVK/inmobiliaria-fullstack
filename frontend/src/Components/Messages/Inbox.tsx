import React from 'react';
import './MessageComponents.css';
import moment from 'moment';

interface InboxProps {
    content: string;
    date: Date;
    isOwn:boolean;
}

const InboxMessage: React.FC<InboxProps> =({
    content,
    date,
    isOwn
}) => {
    return(
        <div className={ isOwn ? 'message-inbox-chat-own':'message-inbox-chat' }>
            <p className='content-mess'>{content}</p>
            <p className='date-mess'>{moment(date).startOf('hour').fromNow()}</p>
        </div>
    )
};
export default InboxMessage;