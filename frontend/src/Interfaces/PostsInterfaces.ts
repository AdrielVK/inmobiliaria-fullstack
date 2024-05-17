import { User } from ".";

interface Feature {
    features:string;
    name:string;
    value:number
}

interface Image {
    image: File;
    title:string;
}

export interface FilteredPosts {
    count:number;
    next:number|null;
    previous:number|null;
    results: Post[] | [] 
}

export interface Post {
    id:number;
    uid:string;
    status: string;
    author:User;
    type:string;
    operation:string;
    title:string;
    num_flat?:number;
    price: number;
    expenses?:number;
    currency_price:string;
    currency_expenses?:string;
    description:string;
    images:Image[];
    video?:File;
    features:Feature[]
    latitude:number;
    longitude:number;
    province: string;
    city:string;
    street:string;
    promotion:boolean;
    street_number:number;
    state:string;
    antiquity?:number;
    id_department?:string;
    terrain_sup?:number;
    total_sup?:number;
    cover_sup?:number;
    financing:boolean;
    services:string[];
    views:number;
    published:string;
}
export interface PostDetail {
    property: Post 
} 
export interface PostState {
    types_list:{ type: string }[]  | null;
    loading_posts: boolean,
    filtered_posts_list: FilteredPosts | null;
    favorites_posts_list: FilteredPosts | null;
    post: PostDetail | null;
    isFavorite: boolean;
    msg_create_post: string | null;
}

export enum PostTypes {
    GET_TYPES_LIST_SUCCESS = 'GET_TYPES_LIST_SUCCESS',
    GET_TYPES_LIST_FAIL = 'GET_TYPES_LIST_FAIL',
    SET_POSTS_LOADING = 'SET_POSTS_LOADING',
    REMOVE_POSTS_LOADING = 'REMOVE_POSTS_LOADING',
    GET_FILTER_POSTS_SUCCESS = 'GET_FILTER_POSTS_SUCCESS',
    GET_FILTER_POSTS_FAIL = 'GET_FILTER_POSTS_FAIL',
    GET_FAVORITES_POSTS_SUCCESS = 'GET_FAVORITES_POSTS_SUCCESS',
    GET_FAVORITES_POSTS_FAIL = 'GET_FAVORITES_POSTS_FAIL',
    ADD_PROPERTY_TO_FAV_SUCCESS = 'ADD_PROPERTY_TO_FAV_SUCCESS',
    ADD_PROPERTY_TO_FAV_FAIL = 'ADD_PROPERTY_TO_FAV_FAIL',
    REMOVE_PROPERTY_TO_FAV_SUCCESS = 'REMOVE_PROPERTY_TO_FAV_SUCCESS',
    REMOVE_PROPERTY_TO_FAV_FAIL = 'REMOVE_PROPERTY_TO_FAV_FAIL' ,
    GET_PROPERTY_SUCCESS = 'GET_PROPERTY_SUCCESS',
    GET_PROPERTY_FAIL = 'GET_PROPERTY_FAIL',
    FAVORITE_TRUE ='FAVORITE_TRUE',
    FAVORITE_FALSE = 'FAVORITE_FALSE',
    CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS',
    CREATE_POST_FAIL = 'CREATE_POST_FAIL',
    EDIT_SUCCESS = 'EDIT_SUCCESS',
    EDIT_FAIL = 'EDIT_FAIL',
    
}   

interface EditFail{
    type: PostTypes.EDIT_FAIL,
    payload: null
}

interface EditSuccess{
    type: PostTypes.EDIT_SUCCESS,
    payload: PostDetail
}
interface CreatePostSuccess {
    type: PostTypes.CREATE_POST_SUCCESS,
    payload: PostDetail,
   
}

interface CreatePostFail {
    type: PostTypes.CREATE_POST_FAIL,
    payload: null,
    
}

interface FavoriteTrue {
    type: PostTypes.FAVORITE_TRUE,
    payload: true
}

interface FavoriteFalse {
    type: PostTypes.FAVORITE_FALSE,
    payload: false
}

interface GetPropertySuccess {
    type: PostTypes.GET_PROPERTY_SUCCESS,
    payload: PostDetail
}

interface GetPropertyFail{
    type: PostTypes.GET_PROPERTY_FAIL,
    payload: null
}

interface RemovePostToFavSuccess{
    type: PostTypes.REMOVE_PROPERTY_TO_FAV_SUCCESS,
    payload:{}
}
interface RemovePostToFavFail{
    type: PostTypes.REMOVE_PROPERTY_TO_FAV_FAIL,
    payload:{}
}

interface GetFavoritesPostsSucess {
    type: PostTypes.GET_FAVORITES_POSTS_SUCCESS;
    payload: FilteredPosts
}

interface GetFavoritesPostsFail {
    type: PostTypes.GET_FAVORITES_POSTS_FAIL;
    payload:null
}

interface AddPropertyToFavSuccess {
    type: PostTypes.ADD_PROPERTY_TO_FAV_SUCCESS;
    payload:{}
}

interface AddPropertyToFavFail {
    type: PostTypes.ADD_PROPERTY_TO_FAV_FAIL;
    payload:null
}

interface GetFilterPostsSuccess {
    type: PostTypes.GET_FILTER_POSTS_SUCCESS;
    payload: FilteredPosts
}

interface GetFilterPostsFail {
    type: PostTypes.GET_FILTER_POSTS_FAIL;
    payload:null
}

interface GetTypesListSuccess {
    type: PostTypes.GET_TYPES_LIST_SUCCESS;
    payload: {
        types: { type: string }[]  | null;
    }
}

interface GetTypesListFail {
    type: PostTypes.GET_TYPES_LIST_FAIL;
    payload: {}
}

interface SetPostsLoading {
    type: PostTypes.SET_POSTS_LOADING;
    payload:null
}

interface RemovePostsLoading {
    type: PostTypes.REMOVE_POSTS_LOADING;
    payload: null
}

export type PostActions =
    GetTypesListSuccess
    |GetTypesListFail
    |SetPostsLoading
    |RemovePostsLoading
    |GetFilterPostsSuccess
    |GetFilterPostsFail
    |AddPropertyToFavSuccess
    |AddPropertyToFavFail
    |GetFavoritesPostsSucess
    |GetFavoritesPostsFail
    |RemovePostToFavSuccess
    |RemovePostToFavFail
    |GetPropertySuccess
    |GetPropertyFail
    |FavoriteTrue
    |FavoriteFalse
    |CreatePostSuccess
    |CreatePostFail
    |EditFail
    |EditSuccess
    