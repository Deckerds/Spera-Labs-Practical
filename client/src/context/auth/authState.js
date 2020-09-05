import React, { useReducer } from 'react';
import AuthContext from './authContext';
import axios from 'axios';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    DELETE_USER,
    DELETE_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    CLEAR_ERRORS,
    SET_CURRENT,
    CLEAR_CURRENT
} from '../types';


const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);


    //Load User
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        };
        try {
            const res = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: AUTH_ERROR
            });
        }
    };

    //Register user
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    //DELETE USER
    const deleteUser = async id => {
        try {
            await axios.delete(`/api/users/${id}`);
            dispatch({
                type:
                    DELETE_USER,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: DELETE_FAIL,
                payload: err.response.msg
            });
        };
    };

    //LOGIN USER
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAILED,
                payload: err.response.data.msg
            });
        };
    };

    //LOGOUT USER
    const logout = () => {
        dispatch({
            type: LOGOUT
        });
    };


    //CLEAR ERROR
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        });
    };

    //SET Products
    const setCurrent = user => {
        dispatch({ type: SET_CURRENT, payload: user });
    }

    //CLEAR CURRENT
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                deleteUser,
                clearErrors,
                loadUser,
                login,
                logout,
                setCurrent,
                clearCurrent
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;