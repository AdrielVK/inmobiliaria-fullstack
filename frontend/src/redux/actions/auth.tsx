import axios from 'axios';
import {AuthActions, AuthTypes} from '@/Interfaces/AuthInterfaces';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';



export const edit_office = (new_office:string | null ):ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  try {
    
    const config = {
      headers: {
          'Accept': 'application/json',
          //'Content-Type': 'multipart/form-data',
          'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };

    const formData = new FormData()
    
    if (new_office){
      formData.append('new_office', new_office)
    }

    dispatch({
      type: AuthTypes.SET_AUTH_LOADING
    })

    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/edit/office`,formData, config)

    if(res.status === 200) { 
      dispatch({
        type:AuthTypes.REMOVE_AUTH_LOADING
      })

      dispatch({
        type: AuthTypes.UPDATE_DEFAULT_USER_SUCCESS,
        payload: res.data.user
      })


    } else {
      dispatch({
        type:AuthTypes.REMOVE_AUTH_LOADING
      })
      dispatch({
        type: AuthTypes.UPDATE_DEFAULT_USER_FAIL,
        payload: res.data.error
      })
    }

  } catch(error:any) {
    dispatch({
      type:AuthTypes.REMOVE_AUTH_LOADING
    })
    dispatch({
      type: AuthTypes.UPDATE_DEFAULT_USER_FAIL,
      payload: error.response.data[0]
    })
  }

}


export const edit_disclaimer = (new_disclaimer:string | undefined ):ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  try {

    const config = {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };

    const formData = new FormData()
    
    if (new_disclaimer){
      formData.append('new_disclaimer', new_disclaimer)
    }

    dispatch({
      type: AuthTypes.SET_AUTH_LOADING
    })

    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/edit/disclaimer`,formData, config)

    if(res.status === 200) { 
      dispatch({
        type:AuthTypes.REMOVE_AUTH_LOADING
      })

      dispatch({
        type: AuthTypes.UPDATE_DEFAULT_USER_SUCCESS,
        payload: res.data.user
      })


    } else {
      dispatch({
        type:AuthTypes.REMOVE_AUTH_LOADING
      })
      dispatch({
        type: AuthTypes.UPDATE_DEFAULT_USER_FAIL,
        payload: res.data.error
      })
    }

  } catch(error:any) {
    dispatch({
      type:AuthTypes.REMOVE_AUTH_LOADING
    })
    dispatch({
      type: AuthTypes.UPDATE_DEFAULT_USER_FAIL,
      payload: error.response.data[0]
    })
  }

}


export const edit_description = (new_description:string | undefined ):ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  try {

    const config = {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };

    const formData = new FormData()
    
    if (new_description){
      formData.append('new_description', new_description)
    }

    dispatch({
      type: AuthTypes.SET_AUTH_LOADING
    })

    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/edit/description`,formData, config)

    if(res.status === 200) { 
      dispatch({
        type:AuthTypes.REMOVE_AUTH_LOADING
      })

      dispatch({
        type: AuthTypes.UPDATE_DEFAULT_USER_SUCCESS,
        payload: res.data.user
      })


    } else {
      dispatch({
        type:AuthTypes.REMOVE_AUTH_LOADING
      })
      dispatch({
        type: AuthTypes.UPDATE_DEFAULT_USER_FAIL,
        payload: res.data.error
      })
    }

  } catch(error:any) {
    dispatch({
      type:AuthTypes.REMOVE_AUTH_LOADING
    })
    dispatch({
      type: AuthTypes.UPDATE_DEFAULT_USER_FAIL,
      payload: error.response.data[0]
    })
  }

}


export const edit_phone = (new_phone_number:string | undefined ):ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  try {

    const config = {
      headers: {
          'Accept': 'application/json',
          
          'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };

    const formData = new FormData()
    
    if (new_phone_number){
      formData.append('new_phone_number', new_phone_number)
    }

    dispatch({
      type: AuthTypes.SET_AUTH_LOADING
    })

    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/edit/phone`,formData, config)

    if(res.status === 200) { 
      dispatch({
        type:AuthTypes.REMOVE_AUTH_LOADING
      })

      dispatch({
        type: AuthTypes.UPDATE_DEFAULT_USER_SUCCESS,
        payload: res.data.user
      })


    } else {
      dispatch({
        type:AuthTypes.REMOVE_AUTH_LOADING
      })
      dispatch({
        type: AuthTypes.UPDATE_DEFAULT_USER_FAIL,
        payload: res.data.error
      })
    }

  } catch(error:any) {
    dispatch({
      type:AuthTypes.REMOVE_AUTH_LOADING
    })
    dispatch({
      type: AuthTypes.UPDATE_DEFAULT_USER_FAIL,
      payload: error.response.data[0]
    })
  }

}


export const edit_picture_banner = (new_banner_picture:File | null ):ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  try {

    const config = {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };

    const formData = new FormData()
    

    if (new_banner_picture) {
      formData.append('new_banner_picture', new_banner_picture, new_banner_picture.name)
    }

    dispatch({
      type: AuthTypes.SET_AUTH_LOADING
    })

    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/edit/pic_banner`,formData, config)

    if(res.status === 200) { 
      dispatch({
        type:AuthTypes.REMOVE_AUTH_LOADING
      })

      dispatch({
        type: AuthTypes.UPDATE_DEFAULT_USER_SUCCESS,
        payload: res.data.user
      })


    } else {
      dispatch({
        type:AuthTypes.REMOVE_AUTH_LOADING
      })
      dispatch({
        type: AuthTypes.UPDATE_DEFAULT_USER_FAIL,
        payload: res.data.error
      })
    }

  } catch(error:any) {
    dispatch({
      type:AuthTypes.REMOVE_AUTH_LOADING
    })
    dispatch({
      type: AuthTypes.UPDATE_DEFAULT_USER_FAIL,
      payload: error.response.data[0]
    })
  }

}


export const edit_picture_profile = (new_profile_picture:File | null ):ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  try {

    const config = {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };

    const formData = new FormData()
    

    if (new_profile_picture) {
      formData.append('new_profile_picture', new_profile_picture, new_profile_picture.name)
    }

    dispatch({
      type: AuthTypes.SET_AUTH_LOADING
    })

    console.log(formData)

    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/edit/pic_profile`,formData, config)
    console.log(res)
    if(res.status === 200) { 
      dispatch({
        type:AuthTypes.REMOVE_AUTH_LOADING
      })

      if (res.data && res.data.user) { // Verificar si res.data y res.data.user están definidos
        dispatch({
          type: AuthTypes.UPDATE_DEFAULT_USER_SUCCESS,
          payload: res.data.user
        });
      }
        


    } else {
      dispatch({
        type:AuthTypes.REMOVE_AUTH_LOADING
      })
      dispatch({
        type: AuthTypes.UPDATE_DEFAULT_USER_FAIL,
        payload: res.data.error
      })
    }

  } catch(error:any) {

    console.log(error)
    dispatch({
      type:AuthTypes.REMOVE_AUTH_LOADING
    })
    dispatch({
      type: AuthTypes.UPDATE_DEFAULT_USER_FAIL,
      payload: error.response.data[0]
    })
  }

}



export const register_publisher = (   email:string,name:string,password:string,re_password:string,phone_number:string,profile_picture:File | null,banner_picture:File | null,disclaimer:string | null,description: string,office:string|null):ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
    if (password != re_password) {
      dispatch({
        type:AuthTypes.REGISTER_PUBLISHER_FAIL,
        payload: { message: "Contrasenas diferentes"}
      })
    } else {

      try {

        dispatch({
          type:AuthTypes.SET_AUTH_LOADING
        })

        const config = {
          headers : {
            'Content-Type': 'multipart/form-data',          }
        };
        
        const formData = new FormData();
        formData.append('email', email)
        formData.append('name', name)
        formData.append('password', password)
        formData.append('re_password', re_password)
        formData.append('phone_number', phone_number)
        if (disclaimer) {
          formData.append('disclaimer', disclaimer)
        }
        if (office) {
          formData.append('office', office)
        }
        formData.append('description', description)
        formData.append('type', "publisher")
        if (profile_picture) {
          formData.append('profile_picture', profile_picture, profile_picture.name)
        }
        if (banner_picture) {
          formData.append('banner_picture', banner_picture, banner_picture.name)

        }
        /*const body = JSON.stringify({
          email,
          name,
          password,
          re_password,
          phone_number,
          profile_picture,
          disclaimer,
          banner_picture,
          description,
          office,
          type:"publisher"
        });*/

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/users/`, formData, config);
        
        console.log(res)

        if (res.status === 201) {
          dispatch({
            type:AuthTypes.REGISTER_PUBLISHER_SUCCESS,
            payload: res.data
          })

          dispatch({
            type:AuthTypes.REMOVE_AUTH_LOADING
          })

        } else {
          dispatch({
            type:AuthTypes.REGISTER_PUBLISHER_FAIL,
            payload: res.data
          })

          dispatch({
            type:AuthTypes.REMOVE_AUTH_LOADING
          })

        }
      } catch(error: any) {

        console.log(error)
        dispatch({
          type:AuthTypes.REMOVE_AUTH_LOADING
        })

        dispatch({
          type:AuthTypes.REGISTER_PUBLISHER_FAIL,
          payload: error.response.data
        })
      }
    }
}

export const delete_user = (current_password:string):ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  try {
    dispatch({
      type: AuthTypes.SET_AUTH_LOADING
    })


    const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/auth/users/me/`, 
     { headers : {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json'
      },
      data:{current_password: current_password}}
    );
    
    if (res.status === 204) {
      dispatch({
        type: AuthTypes.DELETE_ACCOUNT_SUCCESS,
        payload: {}
      })

      dispatch({
        type: AuthTypes.REMOVE_AUTH_LOADING
      })
    } else{
      dispatch({
        type: AuthTypes.DELETE_ACCOUNT_FAIL,
        payload: {}
      })

      dispatch({
        type: AuthTypes.REMOVE_AUTH_LOADING
      })
    }
  } catch (error:any) {
    dispatch({
      type: AuthTypes.DELETE_ACCOUNT_FAIL,
      payload: {}
    })

    dispatch({
      type: AuthTypes.REMOVE_AUTH_LOADING
    })
  }
}

export const change_name = (new_name:string):ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  
  try {
    dispatch({
      type: AuthTypes.SET_AUTH_LOADING
    })



    const config = {
      headers : {
        
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json'
      }
    };
    
    const body = JSON.stringify({
      new_name
    });

    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/change/name/`, body, config);
    console.log(res)
    if (res.status === 200) {
      dispatch({
        type: AuthTypes.REMOVE_AUTH_LOADING
      })
      dispatch({
        type: AuthTypes.UPDATE_DEFAULT_USER_SUCCESS,
        payload: res.data.user
      })
    } else {
      dispatch({
        type: AuthTypes.REMOVE_AUTH_LOADING
      })
      dispatch({
        type: AuthTypes.UPDATE_DEFAULT_USER_FAIL,
        payload: res.data.error
      })
    }


  } catch (error:any) {
    console.log(error)
    dispatch({
      type: AuthTypes.UPDATE_DEFAULT_USER_FAIL,
      payload: error.response.data.error
    })

    dispatch({
      type: AuthTypes.REMOVE_AUTH_LOADING
    })
  }
}

export const load_user = ():ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  try {
    
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
        }
      };

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/users/me/`, config);
      //console.log("daaaaaale")
      //console.log(res)

      if (res.status === 200 ) {

        dispatch({
          type: AuthTypes.USER_LOADED_SUCCESS,
          payload: res.data
        });

      } else {

        dispatch({
          type: AuthTypes.USER_LOADED_FAIL,
        });

      }

      
    } else {
      dispatch({
        type: AuthTypes.USER_LOADED_FAIL,
      });
    }
  } catch (error:string | any) {
    console.error("Error loading user:", error);
    dispatch({
      type: AuthTypes.USER_LOADED_FAIL,
      payload: error.message 
    });
  }
};

export const register = (email:string, name:string, password:string, re_password:string): ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  if (password !== re_password) {
    
    dispatch({
      type:AuthTypes.REGISTER_FAIL,
      payload:{
        email,
        name,
        password,
        re_password,
        message: "Contrasenas distintas"
      }
      
    })
    
  } else{
    try {
      const config = {
        headers : {
          'Content-Type': 'application/json'
        }
    
      };
    
      const body = JSON.stringify({
        email,
        name,
        password,
        re_password,
        banner_picture:null,
        profile_picture:null,
        
      });

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/users/`, body, config);
      if (res.status === 201) {
        dispatch({
          type: AuthTypes.REGISTER_SUCCESS,
          payload: res.data
        })
      } else {
        console.log(res.data)
        dispatch({
          type:AuthTypes.REGISTER_FAIL,
          payload:res.data
        })
      }
    } catch (error: any) {
      console.log(error)
      dispatch({
        type:AuthTypes.REGISTER_FAIL,
        payload:error.response.data
      })
    }
  }
}

export const login = (email:string, password:string): ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  
  try {
  
    dispatch({
        type: AuthTypes.SET_AUTH_LOADING
    })
    
    
    const config = {
      headers : {
        'Content-Type': 'application/json'
      }
    };
    
    const body = JSON.stringify({
      email,
      password
    });
  
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/jwt/create/`, body, config);
    
    if (res.status ===200 ) {
      
      dispatch({
        type: AuthTypes.LOGIN_SUCCESS,
        payload: res.data
      })

      load_user()

      dispatch({
        type: AuthTypes.REMOVE_AUTH_LOADING,
        
      })
    } else {
      console.log("login")
      dispatch({
        type: AuthTypes.LOGIN_FAIL,
        payload: res.data
      })

      dispatch({
        type: AuthTypes.REMOVE_AUTH_LOADING,
        
      })
      
    }

  } catch(error:any) {
    console.log(error.response)
    dispatch({
      type: AuthTypes.LOGIN_FAIL,
      payload: error.response.data
    })
    dispatch({
      type: AuthTypes.REMOVE_AUTH_LOADING,
      
    })
  }
}

export const check_authenticated = (): ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  if (localStorage.getItem('access')) {
    try {
      const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        token: localStorage.getItem('access')
    });

    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/jwt/verify/`, body, config);

    if (res.status === 200) {
      dispatch({
          type: AuthTypes.AUTHENTICATED_SUCCESS,
          payload: res.data
      });
  } else {
      dispatch({
        type: AuthTypes.AUTHENTICATED_FAIL,
      });
  }
    } catch (error) {
      dispatch({
        type: AuthTypes.AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AuthTypes.AUTHENTICATED_FAIL,
    });
  }
}

export const refresh = (): ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  if (localStorage.getItem('refresh')) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        refresh: localStorage.getItem('refresh')
    });

    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/jwt/refresh/`, body, config);

        if (res.status === 200) {
            dispatch({
              type: AuthTypes.REFRESH_SUCCESS,
              payload: res.data
            });
        } else {
            dispatch({
              type: AuthTypes.REFRESH_FAIL
            });
        }
    } catch (err) {
        dispatch({
          type:AuthTypes.REFRESH_FAIL
        });
    }
  } else {
      dispatch({
        type: AuthTypes.REFRESH_FAIL
      });
  }
}

export const activation = (uid: string, token: string):  ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {

  try {
    dispatch({
      type: AuthTypes.SET_AUTH_LOADING
    });
    
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({
      uid,
      token
    });

    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/users/activation/`, body, config);
    
    
    if (res.status === 204) {
      dispatch({
        type:AuthTypes.ACTIVATION_SUCCESS,
        payload: {}
      })

      dispatch({
        type: AuthTypes.REMOVE_AUTH_LOADING
      });

    } else {
      dispatch({
        type: AuthTypes.ACTIVATION_FAIL,
        payload: res.data
      });

      dispatch({
        type: AuthTypes.REMOVE_AUTH_LOADING
      });

    }
  } catch(error: any) {
    
    dispatch({
      type: AuthTypes.ACTIVATION_FAIL,
      payload: error.response.data
    });

    dispatch({
      type: AuthTypes.REMOVE_AUTH_LOADING
    });
  };
  

}

export const reset_password = (email:string | null): ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  dispatch({
      type: AuthTypes.SET_AUTH_LOADING
  });

  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const body = JSON.stringify({ email });

  try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/users/reset_password/`, body, config);

      if (res.status === 204) {
          dispatch({
              type: AuthTypes.RESET_PASSWORD_SUCCESS,

          });
          
          dispatch({
              type: AuthTypes.REMOVE_AUTH_LOADING
          });
      } else {
          dispatch({
              type: AuthTypes.RESET_PASSWORD_FAIL,
              payload:res.data
          });
          dispatch({
              type: AuthTypes.REMOVE_AUTH_LOADING
          });
          
      }
  } catch (err) {
    dispatch({
      type: AuthTypes.RESET_PASSWORD_FAIL,
    });
    dispatch({
        type: AuthTypes.REMOVE_AUTH_LOADING
    });
      
  }
};

export const reset_password_confirm = (uid:string | undefined, token:string | undefined, new_password:string| null, re_new_password:string| null): ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  dispatch({
      type: AuthTypes.SET_AUTH_LOADING
  });

  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const body = JSON.stringify({
      uid,
      token,
      new_password,
      re_new_password
  });

  if (new_password !== re_new_password) {
    dispatch({
        type: AuthTypes.RESET_PASSWORD_CONFIRM_FAIL,
        payload: {
          uid:uid,
          token:token,
          new_password:new_password,
          re_new_password:re_new_password,
          message: "Contrasenas distintas"
        }
    });
    dispatch({
        type: AuthTypes.REMOVE_AUTH_LOADING
    });
      
  } else {
      try {
          const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/users/reset_password_confirm/`, body, config);

          if (res.status === 204) {
              dispatch({
                  type: AuthTypes.RESET_PASSWORD_CONFIRM_SUCCESS,
                  payload: res.data
              });
              dispatch({
                  type: AuthTypes.REMOVE_AUTH_LOADING
              });
              
              
          } else {
              dispatch({
                  type: AuthTypes.RESET_PASSWORD_CONFIRM_FAIL,
                  payload: res.data
              });
              dispatch({
                  type: AuthTypes.REMOVE_AUTH_LOADING
              });
          }
      } catch (err:any) {
          dispatch({
              type: AuthTypes.RESET_PASSWORD_CONFIRM_FAIL,
              payload: {
                uid:uid,
                token:token,
                new_password:new_password,
                re_new_password:re_new_password,
                message: err.response.data[0]
              }
          });
          dispatch({
              type: AuthTypes.REMOVE_AUTH_LOADING
          });
      }
  }
};

export const logout = ():ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  dispatch({
    type: AuthTypes.LOGOUT,
  });
}

export const remove_message = ():ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  dispatch({
    type: AuthTypes.REMOVE_MESSAGE,
    payload: {}
  });
}

export const resend_activate = (email: string) :ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  try {
    dispatch({
      type: AuthTypes.SET_AUTH_LOADING,
    })

    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({
      email
    });

    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/users/resend_activation/`, body, config);
    if (res.status === 204) {
      dispatch({
        type: AuthTypes.REMOVE_AUTH_LOADING
      })
    } else {
      dispatch({
        type: AuthTypes.REMOVE_AUTH_LOADING
      })
    }
  } catch(error) {
    dispatch({
      type: AuthTypes.REMOVE_AUTH_LOADING
    })
  };
};

export const remove_reset_password_flag = ():ThunkAction<void, RootState, unknown, AuthActions> => async (dispatch: Dispatch<AuthActions>) => {
  dispatch({
    type:AuthTypes.REMOVE_RESET_PASSWORD_FLAG,
    payload: {}
  })
}