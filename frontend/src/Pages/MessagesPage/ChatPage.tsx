import React, { useEffect, useState } from 'react';
import "./Messages.css";
import Layout from '@/Components/Layouts/Layout';
import { RootState } from '@/redux/reducers';
import { connect } from 'react-redux';
import Navbar from '@/Components/Navbar/Navbar';
import { get_chat, see_messages, send_message, set_user_params } from '@/redux/actions/messages';
import { useParams } from 'react-router';
import { Message } from '@/Interfaces/MessagesInterfaces';
import InboxMessage from '@/Components/Messages/Inbox';

import { User } from '@/Interfaces';
import { load_user } from '@/redux/actions/auth';


interface ChatProps {
    get_chat: (id_sender: number) => void;
    set_user_params: (id_sender: number, id_receiver: number) => void;
    chat_message: {
        'received':Message[],
        'sent': Message[]
    } | null;
    user: User | null;
    send_message: (content:string, id_user_receiver:number) => void;
    visited_chat: {
        id_receiver: number|null,
        id_sender:number|null
    };
    load_user: ()=>void;
    isAuthenticated:boolean;
}

const ChatPage: React.FC<ChatProps> = ({
    get_chat,
    chat_message,
    user,
    send_message,
    set_user_params,
    visited_chat,
    load_user,
    isAuthenticated
}) => {
    const params = useParams<{id_sender: string}>();
    const id_sender = params.id_sender
    
    
    
    console.log(user)
    console.log(isAuthenticated)
    const [formData, setFormData] = useState({
        message: ''
    })

    const sortedMessagesRec = chat_message?.received.sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    const sortedMessagesSent = chat_message?.sent.sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    let sortedAllMessages = sortedMessagesSent
    
    if (sortedMessagesRec&&sortedMessagesSent){
        const allMessages = [...sortedMessagesRec, ...sortedMessagesSent];
        sortedAllMessages = allMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    } else if(sortedMessagesRec) {
        sortedAllMessages = sortedMessagesRec
    } 

  // Ordenar la lista combinada
    
    const {
        message
    } = formData

    const onChangeText = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(id_sender){
            const id = parseInt(id_sender, 10)
            send_message(message, id)
            get_chat(id)
        }
        
    }

    useEffect(() => {
        // Verificar si el usuario está cargado y si el id_sender es válido
        if (!user && isAuthenticated) {
            // Si el usuario está autenticado pero aún no se ha cargado, cargarlo
            load_user();
        } else if (id_sender && user?.id) {
            // Si el usuario está cargado y hay un id_sender válido, obtener el chat
            get_chat(parseInt(id_sender, 10));
            set_user_params(parseInt(id_sender, 10), user.id);
        }
    }, [user, isAuthenticated, id_sender]);

    

    return (
        <Layout>
            <Navbar/>
            {   
                user ?
                (
                    chat_message ? (
                    
                    <div className='chat'>
                        <div className='top-chat'>
                            {
                                chat_message.received[0].sender.profile_picture?
                                <div className="profile-imageprofile">
                                    <img alt='image-profile' className='img-profile' src={`${chat_message.received[0].sender.profile_picture}`}/>
                                </div>
                                :
                                <></>
                            }
                            <p className='top-item-chat'>{chat_message.received[0].sender.name}</p>
                            <p className='top-item-chat'>{chat_message.received[0].sender.email}</p>
                            {
                                chat_message.received[0].sender.phone_number ?
                                <p className='top-item-chat'>Numero de tel: {chat_message.received[0].sender.phone_number}</p>
                                :
                                <></>
                            }
                        </div>
                        <div className='content-messages'>
                            {
                                
                                sortedAllMessages&&sortedAllMessages.map((mess, index) => (
                                <InboxMessage isOwn={mess.sender.id === user?.id} content={mess.content} date={mess.timestamp} key={index} />
                            ))
                            }
                        </div>

                        <div className='bot-chat'>
                            <form className='form-chat' onSubmit={(e) => {onSubmit(e)}} method='POST'>
                                <textarea
                                    value={message}
                                    id='message'
                                    name='message'
                                    style={{ resize: 'none' }}
                                    onChange={e=>onChangeText(e)}
                                    required
                                    className='message-text'
                                    placeholder='Mensaje'
                                />
                                
                                <button className='button-chat-send' type='submit'>
                                    Enviar
                                </button>
                                                    
                            </form>
                        </div>
                    </div>
                    )
                :
                (
                <></>
                )
                )
                :
                (<div className='loading-chat'>Cargando...</div>)
                
            }
            

        </Layout>
    )
}

const mapStateToProps = (state:RootState) => ({
    user: state.auth.user,
    chat_message: state.messages.chat_messages,
    visited_chat: state.messages.visited_chat,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
    get_chat,
    send_message,
    set_user_params,
    load_user
})(ChatPage)