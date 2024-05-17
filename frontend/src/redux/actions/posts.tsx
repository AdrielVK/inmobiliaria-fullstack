import axios from 'axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { Post, PostActions, PostTypes } from '@/Interfaces/PostsInterfaces';

export const edit_price= (uid:string, price:number):ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    try {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            },
        };

        dispatch({
            type: PostTypes.SET_POSTS_LOADING,
            payload: null
        });
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/estates/edit/price/${uid}`, price ,config);

        if (res.status === 200) {
            dispatch({
                type: PostTypes.EDIT_SUCCESS,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        } else {
            dispatch({
                type: PostTypes.EDIT_FAIL,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        }

    } catch(error){
        dispatch({
            type: PostTypes.EDIT_FAIL,
            payload: null
        })
        dispatch({
            type: PostTypes.REMOVE_POSTS_LOADING,
            payload: null
        })
    }
}

export const edit_num_flat= (uid:string, num_flat:number):ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    try {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            },
        };

        dispatch({
            type: PostTypes.SET_POSTS_LOADING,
            payload: null
        });
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/estates/edit/num_flat/${uid}`, num_flat ,config);

        if (res.status === 200) {
            dispatch({
                type: PostTypes.EDIT_SUCCESS,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        } else {
            dispatch({
                type: PostTypes.EDIT_FAIL,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        }

    } catch(error){
        dispatch({
            type: PostTypes.EDIT_FAIL,
            payload: null
        })
        dispatch({
            type: PostTypes.REMOVE_POSTS_LOADING,
            payload: null
        })
    }
}

export const edit_id_department= (uid:string, id_department:string):ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    try {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            },
        };

        dispatch({
            type: PostTypes.SET_POSTS_LOADING,
            payload: null
        });
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/estates/edit/id_department/${uid}`, id_department ,config);

        if (res.status === 200) {
            dispatch({
                type: PostTypes.EDIT_SUCCESS,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        } else {
            dispatch({
                type: PostTypes.EDIT_FAIL,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        }

    } catch(error){
        dispatch({
            type: PostTypes.EDIT_FAIL,
            payload: null
        })
        dispatch({
            type: PostTypes.REMOVE_POSTS_LOADING,
            payload: null
        })
    }
}

export const edit_operation = (uid:string, operation:string):ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    try {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            },
        };

        dispatch({
            type: PostTypes.SET_POSTS_LOADING,
            payload: null
        });
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/estates/edit/operation/${uid}`, operation ,config);

        if (res.status === 200) {
            dispatch({
                type: PostTypes.EDIT_SUCCESS,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        } else {
            dispatch({
                type: PostTypes.EDIT_FAIL,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        }

    } catch(error){
        dispatch({
            type: PostTypes.EDIT_FAIL,
            payload: null
        })
        dispatch({
            type: PostTypes.REMOVE_POSTS_LOADING,
            payload: null
        })
    }
}

export const edit_type = (uid:string, type:string):ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    try {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            },
        };

        dispatch({
            type: PostTypes.SET_POSTS_LOADING,
            payload: null
        });
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/estates/edit/type/${uid}`, type ,config);

        if (res.status === 200) {
            dispatch({
                type: PostTypes.EDIT_SUCCESS,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        } else {
            dispatch({
                type: PostTypes.EDIT_FAIL,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        }

    } catch(error){
        dispatch({
            type: PostTypes.EDIT_FAIL,
            payload: null
        })
        dispatch({
            type: PostTypes.REMOVE_POSTS_LOADING,
            payload: null
        })
    }
}

export const edit_status = (uid:string, status:string):ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    try {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            },
        };

        dispatch({
            type: PostTypes.SET_POSTS_LOADING,
            payload: null
        });
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/estates/edit/status/${uid}`, status ,config);

        if (res.status === 200) {
            dispatch({
                type: PostTypes.EDIT_SUCCESS,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        } else {
            dispatch({
                type: PostTypes.EDIT_FAIL,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        }

    } catch(error){
        dispatch({
            type: PostTypes.EDIT_FAIL,
            payload: null
        })
        dispatch({
            type: PostTypes.REMOVE_POSTS_LOADING,
            payload: null
        })
    }
}

export const edit_title = (uid:string, new_title:string):ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    try {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            },
        };

        dispatch({
            type: PostTypes.SET_POSTS_LOADING,
            payload: null
        });
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/estates/edit/title/${uid}`, new_title ,config);

        if (res.status === 200) {
            dispatch({
                type: PostTypes.EDIT_SUCCESS,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        } else {
            dispatch({
                type: PostTypes.EDIT_FAIL,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        }

    } catch(error){
        dispatch({
            type: PostTypes.EDIT_FAIL,
            payload: null
        })
        dispatch({
            type: PostTypes.REMOVE_POSTS_LOADING,
            payload: null
        })
    }
}

export const get_property = (uid:string|undefined):ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    try {
        const config = {
            headers:{
                'Accept': 'application/json',
            }
        };
        
        dispatch({
            type: PostTypes.SET_POSTS_LOADING,
            payload: null
        });

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/estates/detail/${uid}`, config);
        
        if (res.status === 200) {
            dispatch({
                type: PostTypes.GET_PROPERTY_SUCCESS,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        } else {
            dispatch({
                type: PostTypes.GET_PROPERTY_FAIL,
                payload: null
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        }

    } catch(error) {
        dispatch({
            type: PostTypes.GET_PROPERTY_FAIL,
            payload: null
        })
        dispatch({
            type: PostTypes.REMOVE_POSTS_LOADING,
            payload: null
        })
    }
}

export const get_operation_posts = (operation:string ):ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    try {
        

        const config = {
            headers: {
            'Accept': 'application/json',
            },
            
        };
    
        dispatch({
            type: PostTypes.SET_POSTS_LOADING,
            payload: null
        });

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/estates/operation/${operation}`, config);
        
        if (res.status === 200) {
            dispatch({
                type: PostTypes.GET_FILTER_POSTS_SUCCESS,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        } else {
            dispatch({
                type: PostTypes.GET_FILTER_POSTS_FAIL,
                payload:null
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        }
  
    } catch(error) {
        console.log(error)
        dispatch({
            type: PostTypes.GET_FILTER_POSTS_FAIL,
            payload:null
        })
        dispatch({
            type: PostTypes.REMOVE_POSTS_LOADING,
            payload: null
        })
    }
}

export const remove_fav_post = (id:number): ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    
    try {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            },
        };
        
        dispatch({
            type: PostTypes.SET_POSTS_LOADING,
            payload: null
        });

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/favorites/remove/${id}`, {}, config)
        
        if (res.status === 200) {
            
            dispatch({
                type: PostTypes.REMOVE_PROPERTY_TO_FAV_SUCCESS,
                payload:{}
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        } else {
            
            dispatch({
                type: PostTypes.REMOVE_PROPERTY_TO_FAV_FAIL,
                payload:{}
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        }
    } catch(error) {
        console.log(error)
        dispatch({
            type: PostTypes.REMOVE_PROPERTY_TO_FAV_FAIL,
            payload:{}
        })
        dispatch({
            type: PostTypes.REMOVE_POSTS_LOADING,
            payload: null
        })
    }
} 

export const is_favorite = (id:number, favorites_posts_list:Post[]): ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    try {   
        const determinate:boolean =  favorites_posts_list.some(
            (postFav) => postFav.id === id
        )
    
        if (determinate) {
            dispatch({
                type: PostTypes.FAVORITE_TRUE,
                payload: true
            });
        } else {
            dispatch({
                type: PostTypes.FAVORITE_FALSE,
                payload: false
            });
        }
    } catch(error){
        dispatch({
            type: PostTypes.FAVORITE_FALSE,
            payload: false
        });
    }
    
}

export const add_fav_post = (id:number): ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    
    try {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            },
        };
        
        dispatch({
            type: PostTypes.SET_POSTS_LOADING,
            payload: null
        });

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/favorites/add/${id}`, {}, config)
        
        if (res.status === 200) {
            
            dispatch({
                type: PostTypes.ADD_PROPERTY_TO_FAV_SUCCESS,
                payload:{}
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        } else {
            
            dispatch({
                type: PostTypes.ADD_PROPERTY_TO_FAV_FAIL,
                payload:null
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        }
    } catch(error) {
        
        dispatch({
            type: PostTypes.ADD_PROPERTY_TO_FAV_FAIL,
            payload:null
        })
        dispatch({
            type: PostTypes.REMOVE_POSTS_LOADING,
            payload: null
        })
    }
} 

export const get_favorites_posts = ():ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    try {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            },
        };
        
        dispatch({
            type: PostTypes.SET_POSTS_LOADING,
            payload: null
        });

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/favorites`, config);
        
        if (res.status === 200) {
            
            dispatch({
                type: PostTypes.GET_FAVORITES_POSTS_SUCCESS,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        } else {
            dispatch({
                type: PostTypes.GET_FAVORITES_POSTS_FAIL,
                payload:null
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        }
    } catch(error) {
        dispatch({
            type: PostTypes.GET_FAVORITES_POSTS_FAIL,
            payload:null
        })
        dispatch({
            type: PostTypes.REMOVE_POSTS_LOADING,
            payload: null
        })
    }
}

export const set_empty_posts = ():ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    try{
        dispatch({
            type: PostTypes.GET_FILTER_POSTS_FAIL,
            payload:null
        })
    } catch(error) {
        console.log(error)
    }
}

export const filter_posts = (filterParams:any ):ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    try {
        

        const config = {
            headers: {
            'Accept': 'application/json',
            },
            params: filterParams
        };
    
        dispatch({
            type: PostTypes.SET_POSTS_LOADING,
            payload: null
        });

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/estates/filter/`, config);
        console.log(res)
        if (res.status === 200) {
            dispatch({
                type: PostTypes.GET_FILTER_POSTS_SUCCESS,
                payload: res.data
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        } else {
            dispatch({
                type: PostTypes.GET_FILTER_POSTS_FAIL,
                payload:null
            })
            dispatch({
                type: PostTypes.REMOVE_POSTS_LOADING,
                payload: null
            })
        }
  
    } catch(error) {
        dispatch({
            type: PostTypes.GET_FILTER_POSTS_FAIL,
            payload:null
        })
        dispatch({
            type: PostTypes.REMOVE_POSTS_LOADING,
            payload: null
        })
    }
}


export const get_types_list = ():ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
            }
        }
        dispatch({
            type:PostTypes.SET_POSTS_LOADING,
            payload:null
        })
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/estates/types_list`, config)

        if(res.status === 200) {
            dispatch({
                type:PostTypes.GET_TYPES_LIST_SUCCESS,
                payload: res.data
            })

            dispatch({
                type:PostTypes.REMOVE_POSTS_LOADING,
                payload:null
            })
        } else {
            dispatch({
                type: PostTypes.GET_TYPES_LIST_FAIL,
                payload: {}
            })

            dispatch({
                type:PostTypes.REMOVE_POSTS_LOADING,
                payload:null
            })
        }
    } catch (error) {
        dispatch({
            type: PostTypes.GET_TYPES_LIST_FAIL,
            payload: {}
        })

        dispatch({
            type:PostTypes.REMOVE_POSTS_LOADING,
            payload:null
        })
    }
}


export const create_post = (formData: FormData):ThunkAction<void, RootState, unknown, PostActions> => async (dispatch: Dispatch<PostActions>) => {
    try{
        const config= {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        dispatch({
            type:PostTypes.SET_POSTS_LOADING,
            payload:null
        })

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/estates/create`,formData, config)
        
        if(res.status === 201) {
            dispatch({
                type: PostTypes.CREATE_POST_SUCCESS,
                payload: res.data,
                
            })
            dispatch({
                type:PostTypes.REMOVE_POSTS_LOADING,
                payload:null
            })
        } else {
            dispatch({
                type:PostTypes.REMOVE_POSTS_LOADING,
                payload:null
            })
            dispatch({
                type: PostTypes.CREATE_POST_FAIL,
                payload: null,
                msg_create_post: 'Error, verifica los datos'
            })
        }

    } catch(error:any) {
        dispatch({
            type:PostTypes.REMOVE_POSTS_LOADING,
            payload:null
        })
        dispatch({
            type: PostTypes.CREATE_POST_FAIL,
            payload: null,
            msg_create_post: error.response.data
        })
    }
}