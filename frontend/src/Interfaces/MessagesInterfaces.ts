import { User } from "../Interfaces/AuthInterfaces";


export interface Message {
    id:number;
    receiver: User;
    sender: User;
    content: string;
    timestamp: Date;
    saw: boolean;
}

export interface MessageState {
    messages_list:{
        sender_id: User[];
        message_count: number;
        messages: Message[]
    }[] | null ;
    last_message: Message |  null;
    chat_messages: {
        'received':Message[],
        'sent': Message[]
    } | null;
    visited_chat: {
        id_sender:number|null,
        id_receiver:number|null
    }
}

export enum MessagesTypes {
    GET_MESSAGE_LIST_SUCCESS ='GET_MESSAGE_LIST_SUCCESS',
    GET_MESSAGE_LIST_FAIL = 'GET_MESSAGE_LIST_FAIL',
    SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS',
    SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL',
    GET_CHAT_SUCCESS = 'GET_CHAT_SUCCESS',
    GET_CHAT_FAIL = 'GET_CHAT_FAIL',
    DELETE_MESSAGES_SUCCESS =  'DELETE_MESSAGES_SUCCESS',
    DELETE_MESSAGES_FAIL = 'DELETE_MESSAGES_FAIL',
    SET_SEE_MESSAGES_SUCCESS = 'SET_SEE_MESSAGES_SUCCESS',
    SET_SEE_MESSAGES_FAIL = 'SET_SEE_MESSAGES_FAIL',
    GET_SAW_CHAT = 'GET_SAW_CHAT', 
}   

export interface GetSawChat {
    type: MessagesTypes.GET_SAW_CHAT,
    payload:{
        id_sender:number,
        id_receiver:number
    }
}

export interface DeleteMessagesSuccess {
    type: MessagesTypes.DELETE_MESSAGES_SUCCESS,
    payload: null
}

export interface DeleteMessagesFail {
    type: MessagesTypes.DELETE_MESSAGES_FAIL,
    payload: null
}

export interface SetSeeMessagesSuccess{
    type: MessagesTypes.SET_SEE_MESSAGES_SUCCESS,
    payload: null
}

export interface SetSeeMessagesFail{
    type: MessagesTypes.SET_SEE_MESSAGES_FAIL,
    payload: null
}

export interface GetChatSuccess{
    type: MessagesTypes.GET_CHAT_SUCCESS,
    payload: {
        'received':Message[],
        'sent': Message[]
    }
}

export interface GetChatFail{
    type: MessagesTypes.GET_CHAT_FAIL,
    payload: null
}

export interface GetMessagesSuccess { 
    type: MessagesTypes.GET_MESSAGE_LIST_SUCCESS,
    payload: {
        sender_id: User[];
        message_count: number;
        messages: Message[]
    }[]
}

export interface GetMessagesFail {
    type: MessagesTypes.GET_MESSAGE_LIST_FAIL,
    payload: {}
}

export interface SendMessageSucces {
    type: MessagesTypes.SEND_MESSAGE_SUCCESS,
    payload: Message
}

export interface SendMessageFail {
    type: MessagesTypes.SEND_MESSAGE_FAIL,
    payload:{}
}

export type MessageActions = 
    GetMessagesSuccess
    |GetMessagesFail
    |SendMessageSucces
    |SendMessageFail
    |GetChatSuccess
    |GetChatFail
    |DeleteMessagesSuccess
    |DeleteMessagesFail
    |SetSeeMessagesSuccess
    |SetSeeMessagesFail
    |GetSawChat