import { GET_MESSAGES, GET_ERRORS, GET_POST } from './types';
import { tokenConfig } from './auth';
import axios from 'axios';

export const addPost = (title, post) => (dispatch, getState) => {

    const body = { title:title, data:post, author: getState().auth.user.id }

    axios.post('/editor/', body, tokenConfig(getState))
    .then((res)=>{
        dispatch({
            type: GET_MESSAGES,
            payload: "POST ADDED"
        });
    })
    .catch((err)=>{
        const error ={
            msg: err.response.data,
            status: err.response.status
          }
          dispatch({
            type: GET_ERRORS,
            payload: error
          })
    })
}


export const getPost = (slug) => (dispatch, getState) => {
    axios.get('/post/'+slug+'/')
    .then(res => {
        dispatch({
            type: GET_POST,
            payload: res.data
        })
        
    })
    .catch(err => {
        console.log(err)
    })
}