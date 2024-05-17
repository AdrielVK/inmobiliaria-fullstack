import { MessageActions,MessagesTypes,MessageState } from "@/Interfaces/MessagesInterfaces";

const initialState: MessageState = {
    messages_list:null,
    last_message:null,
    chat_messages:null,
    visited_chat:{
        id_receiver: null,
        id_sender:null
    }
}

const messages = (
    state = initialState,
    action: MessageActions
): MessageState => {
    const {type, payload} = action;

    switch(type){
        case MessagesTypes.GET_SAW_CHAT:
            return{
                ...state,
                visited_chat:payload
            }
        case MessagesTypes.GET_CHAT_SUCCESS:
            return{
                ...state,
                chat_messages: payload
            }
        case MessagesTypes.GET_CHAT_FAIL:
            return{
                ...state,
                chat_messages: null
            }
        case MessagesTypes.GET_MESSAGE_LIST_SUCCESS:
            return{
                ...state,
                messages_list: payload
            };
        case MessagesTypes.GET_MESSAGE_LIST_FAIL:
            return{
                ...state,
                messages_list: null
            };
        case MessagesTypes.SEND_MESSAGE_SUCCESS:
            return{
                ...state,
                last_message: payload
            };
        case MessagesTypes.SEND_MESSAGE_FAIL:
            return{
                ...state
            }
        default:
            return state
    }
}

export default messages