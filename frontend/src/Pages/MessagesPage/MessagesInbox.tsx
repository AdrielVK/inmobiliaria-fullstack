import React, { useEffect, useState } from 'react';
import "./Messages.css";
import Layout from '@/Components/Layouts/Layout';
import { RootState } from '@/redux/reducers';
import { connect } from 'react-redux';
import Navbar from '@/Components/Navbar/Navbar';
import { delete_messages, get_messages, see_messages } from '@/redux/actions/messages';
import { Message } from '@/Interfaces/MessagesInterfaces';
import ChatMessage from '@/Components/Messages/ChatMessage';
import { User } from '@/Interfaces';
import { get_chat } from '@/redux/actions/messages';
import { useNavigate } from 'react-router';
import Empty from '@/Components/Errors/Empty';


interface InboxProps {
    get_messages: () => void;
    messages_list: {
        sender_id: User[];
        message_count: number;
        messages: Message[]
    }[] | null;
    delete_messages: () => void;
    see_messages:(id_sender:number, id_receiver:number) => void;
    visited_chat: {
        id_receiver: number|null,
        id_sender:number|null
    }
    
};

const MessagesInbox: React.FC<InboxProps> = ({
    get_messages,
    messages_list,
    delete_messages,
    see_messages,
    visited_chat
}) => {
    const navigate = useNavigate();

    const getChatAction = (e: React.MouseEvent, id_sender:number) =>{
        e.stopPropagation();
        navigate(`/messages/chat/${id_sender}`);
    }

    useEffect(() => {
        get_messages()
    },[])
    
    useEffect(() => {
        if(visited_chat.id_sender !== null && visited_chat.id_receiver !== null) {
            see_messages(visited_chat.id_sender,visited_chat.id_receiver)
            delete_messages()
        }
    }, [visited_chat])

    return (
        <Layout>
            <Navbar/>
            <h1>Bandeja de entrada</h1>
            <ul className='ul-messages'>
                {
                    messages_list && messages_list .length > 0 ?
                    (
                        messages_list&&messages_list.map((item, index) => (
                            <ChatMessage onClickAction={e => getChatAction(e, item.sender_id[0].id)} key={index} content={item.messages[0].content} message_count={item.message_count} name={item.sender_id[0].name} />
                        ))
                    )
                    :
                    (
                    <Empty text='No tienes mensajes'/>
                    )
                }
            </ul>
        </Layout>
    )
};

const mapStateToProps = (state:RootState) => ({
    messages_list: state.messages.messages_list,
    visited_chat: state.messages.visited_chat
});

export default connect(mapStateToProps, {
    get_messages,
    delete_messages,
    see_messages
})(MessagesInbox)