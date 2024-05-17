import axios from 'axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { MessageActions, MessagesTypes } from '@/Interfaces/MessagesInterfaces';

export const delete_messages = ():ThunkAction<void, RootState, unknown, MessageActions> => async (dispatch: Dispatch<MessageActions>) => {
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };
        const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/messages/delete`, config)

        if(res.status === 204) {
            dispatch({
                type:MessagesTypes.DELETE_MESSAGES_SUCCESS,
                payload: null
            })
        } else {
            dispatch({
                type:MessagesTypes.DELETE_MESSAGES_FAIL,
                payload: null
            })
        }
    } catch(error){
        dispatch({
            type:MessagesTypes.DELETE_MESSAGES_FAIL,
            payload: null
        })
    }
}

export const set_user_params = (id_sender:number,id_receiver:number):ThunkAction<void, RootState, unknown, MessageActions> => async (dispatch: Dispatch<MessageActions>) => {
    
    dispatch({
        type:MessagesTypes.GET_SAW_CHAT,
        payload: {
            id_receiver: id_receiver,
            id_sender: id_sender
        }
    })
    
}

export const see_messages = (id_sender:number,id_receiver:number):ThunkAction<void, RootState, unknown, MessageActions> => async (dispatch: Dispatch<MessageActions>) => {
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/messages/chat/saw/${id_sender}/${id_receiver}`, config)

        if(res.status === 200) {
            dispatch({
                type:MessagesTypes.SET_SEE_MESSAGES_SUCCESS,
                payload: null
            })
        } else {
            dispatch({
                type:MessagesTypes.SET_SEE_MESSAGES_FAIL,
                payload: null
            })
        }
    } catch(error){
        console.log(error)
        dispatch({
            type:MessagesTypes.SET_SEE_MESSAGES_FAIL,
            payload: null
        })
    }
}

export const send_message = (content:string, id_user_receiver:number):ThunkAction<void, RootState, unknown, MessageActions> => async (dispatch: Dispatch<MessageActions>) => {
    try {

        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const formData = new FormData()

        formData.append('content', content)
        formData.append('id_user_receiver', id_user_receiver.toString())

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/messages/send`, formData, config)
        console.log(res)
        if (res.status === 200) {
            dispatch({
                type: MessagesTypes.SEND_MESSAGE_SUCCESS,
                payload: res.data
            })

        } else {
            dispatch({
                type: MessagesTypes.SEND_MESSAGE_FAIL,
                payload: {}
            })
        }

    } catch(error){
        console.log(error)
        dispatch({
            type: MessagesTypes.SEND_MESSAGE_FAIL,
            payload: {}
        })
    }
}

export const get_messages = ():ThunkAction<void, RootState, unknown, MessageActions> => async (dispatch: Dispatch<MessageActions>) => {
    try{
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/messages/list`, config)
        console.log(res)
        if (res.status === 200) {
            dispatch({
                type:MessagesTypes.GET_MESSAGE_LIST_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: MessagesTypes.GET_MESSAGE_LIST_FAIL,
                payload: {}
            })
        }

    } catch(error) {
        console.log(error)
        dispatch({
            type: MessagesTypes.GET_MESSAGE_LIST_FAIL,
            payload: {}
        })
    }
}

export const get_chat = (id_sender:number):ThunkAction<void, RootState, unknown, MessageActions> => async (dispatch: Dispatch<MessageActions>) => {
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/messages/chat/${id_sender}`, config)
        console.log(res)
        if (res.status === 200) {
            dispatch({
                type: MessagesTypes.GET_CHAT_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: MessagesTypes.GET_CHAT_FAIL,
                payload: null
            })
        }
    } catch(error){
        dispatch({
            type: MessagesTypes.GET_CHAT_FAIL,
            payload: null
        })
    }
};
