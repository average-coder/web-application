import axios from 'axios';
import { GET_MESSAGES, GET_ERRORS, SET_LOADING } from '../actions/types';


export const requestPost = (req, captcha, responseG) => (dispatch, getState) => {
  dispatch({
    type: SET_LOADING
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (req === "" || req === null) {

    const error = {
      msg: "PLEASE ENTER A VALID REQUEST",
      status: 10401
    };
    dispatch({
      type: SET_LOADING
    });
    dispatch({
      type: GET_ERRORS,
      payload: error
    });

    return
  }

  const body = { data: req, responseG: responseG }

  axios.post('/post-request/', body, config)
    .then((res) => {
      dispatch({
        type: SET_LOADING
      });

      dispatch({
        type: GET_MESSAGES,
        payload: "THANK YOU, YOUR REQUEST HAS BEEN SENT"
      });

    })
    .catch((err) => {

      const error = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: SET_LOADING
      });

      dispatch({
        type: GET_ERRORS,
        payload: error
      });

    })

}