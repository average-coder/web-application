import { GET_MESSAGES, GET_ERRORS, GET_POST, CLEAR_POST, SET_LOADING } from './types';
import { tokenConfig } from './auth';
import axios from 'axios';

export const addPost = (title, post) => (dispatch, getState) => {

    const body = { title: title, data: post, author: getState().auth.user.id }

    axios.post('/editor/', body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_MESSAGES,
                payload: "POST ADDED"
            });
        })
        .catch((err) => {
            const error = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ERRORS,
                payload: error
            })
        })
}

export const updatePost = (title, post, id) => (dispatch, getState) => {

    const body = { title: title, data: post, author: getState().auth.user.id }
 

    axios.put(`/editor/${id}/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_MESSAGES,
                payload: "POST UPDATED"
            });
        })
        .catch((err) => {
            const error = {
                msg: err.response.data,
                status: err.response.status
            };
            dispatch({
                type: GET_ERRORS,
                payload: error
            });
        })
}


export const getPost = (slug) => (dispatch, getState) => {
    dispatch({
        type: SET_LOADING
    })
    axios.get('/post/' + slug + '/')
        .then(res => {
            dispatch({
                type: GET_POST,
                payload: res.data
            });
            dispatch({
                type: SET_LOADING
            });

        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: SET_LOADING
            });
        })
}

export const clearPost = () => (dispatch, getState) => {
    dispatch({
        type: CLEAR_POST,
        payload: null
    })
}