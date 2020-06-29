import { GET_USER } from "../actions/ActionTypes";

const INITIAL_STATE = {
    isAuthenticated:false,
    user:{},
};
 
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USER:
            return {...state,
            isAuthenticated:true,
            user:action.payload
            }
        default:
            return state
    }
}