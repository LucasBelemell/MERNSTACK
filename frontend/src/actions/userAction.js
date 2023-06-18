import {
    LOGIN_USER_REQUEST, 
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAIL
} from "../constants/userConstants";
import axios from "axios";



export const login = (email, password) => async (dispatch) => {
    
    try {
        dispatch({ type: LOGIN_USER_REQUEST });
       
        const { data } = await axios.post(
         'http://localhost:4000/api/v1/login',
         { email, password },
        {withCredentials: true}
        );
        
        dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({ type: LOGIN_USER_FAIL, payload: error.response.data.message });
    }
};
export const logout = () => async (dispatch) => {
    try {
       await axios.get('http://localhost:4000/api/v1/logout',
       { withCredentials: true });  
       dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message})
    }
}
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" }};

        const { data } = await axios.post('http://localhost:4000/api/v1/register', userData, config); 
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user }); 
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
};
export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
      const { data } = await axios.get('http://localhost:4000/api/v1/me',
      {
        withCredentials: true,
    });
    
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (err) {
        dispatch({ type: LOAD_USER_FAIL, payload: err.response.data.message });
    }  
};
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
};



// Update Profile 
export const updateProfile = (userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });

      const { data } = await axios.put('http://localhost:4000/api/v1/me/update', userData,
      { withCredentials: true }
      );
  
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };



// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const { data } = await axios.put(
      'http://localhost:4000/api/v1/password/update', 
    passwords,
    { withCredentials: true }
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// forgot Password

export const forgotPassword = (email) => async (dispatch) => {
    
  try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
     
      const { data } = await axios.post(
       'http://localhost:4000/api/v1/password/forgot',
        email,
        { withCredentials: true }
      );
      
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message});
  } catch (error) {
      dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/password/reset/${token}`,
      password, 
      { withCredentials: true }
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload : error.response.data.message,
    }); 
  }
};