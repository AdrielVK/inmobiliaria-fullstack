import { PostActions,PostTypes,PostState } from "@/Interfaces/PostsInterfaces";

const initialState: PostState = {
    types_list: null,
    loading_posts: false,
    filtered_posts_list: null,
    favorites_posts_list:null,
    post: null,
    msg_create_post: null,
    isFavorite: false,
};

const posts = (
    state = initialState,
    action: PostActions
): PostState => {
    const {type, payload} = action;

    switch (type){
        
        case PostTypes.FAVORITE_FALSE:
        case PostTypes.FAVORITE_TRUE:
            return {
                ...state,
                isFavorite: payload
            }
        
        case PostTypes.CREATE_POST_SUCCESS:
            return{
                ...state,
                post: payload,
                msg_create_post: 'Publicacion creada exitosamente'
            }
        
        case PostTypes.EDIT_SUCCESS:
        case PostTypes.GET_PROPERTY_SUCCESS:
            return{
                ...state,
                post: payload
            }
        case PostTypes.CREATE_POST_FAIL:
            return{
                ...state,
                post: null,
                msg_create_post: payload
            }
        case PostTypes.GET_PROPERTY_FAIL:
            return{
                ...state,
                post: null
            }
        case PostTypes.REMOVE_PROPERTY_TO_FAV_SUCCESS:
            return {
                ...state,
                
            }
        case PostTypes.EDIT_FAIL:
        case PostTypes.REMOVE_PROPERTY_TO_FAV_FAIL:
            return {
                ...state,
            }
        case PostTypes.GET_FAVORITES_POSTS_SUCCESS:
            return{
                ...state,
                favorites_posts_list:payload
            }
        case PostTypes.GET_FAVORITES_POSTS_FAIL:
            return{
                ...state,
                favorites_posts_list:null,
            }
        case PostTypes.ADD_PROPERTY_TO_FAV_SUCCESS:
            return{
                ...state
            }
        case PostTypes.ADD_PROPERTY_TO_FAV_FAIL:
            return{
                ...state
            }
        case PostTypes.GET_FILTER_POSTS_SUCCESS:
            return{
                ...state,
                filtered_posts_list:payload
            }
        case PostTypes.GET_FILTER_POSTS_FAIL:
            return{
                ...state,
                filtered_posts_list:null,
            }
        case PostTypes.GET_TYPES_LIST_SUCCESS:
            return{
                ...state,
                types_list:payload.types,
            };
        case PostTypes.GET_TYPES_LIST_FAIL:
            return{
                ...state
            }
        default:
            return state
    }
}

export default posts