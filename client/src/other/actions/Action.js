import { LOADING_DATA, GET_TWITTER_DATA, GET_ERRORS, GET_USER } from "./ActionTypes";
import axios from "axios";


//FETCHING DATA FROM BACKEND
export const getData = (queryData) => dispatch => {
    dispatch({
        type: LOADING_DATA,
       
      })
    
  axios.post("/analysis",queryData).then(res =>
    dispatch({
      type:GET_TWITTER_DATA ,
      payload: res.data
    })
  ).catch(err =>
    dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};
//GET CURRENT USER
export const getUser = () => dispatch => {
  

  axios.get("/current_user").then(res =>
    dispatch({
      type: GET_USER,
      payload: res.data
    })
  );
};