import { LOADING_DATA, GET_TWITTER_DATA } from "../actions/ActionTypes";

const INITIAL_STATE = {
    isLoading:false,
    isRetrieved:false,
    twitter:[]
};
 
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING_DATA:
            return {...state,
            isLoading:true
            }
            case GET_TWITTER_DATA:
                return {...state,
                    isLoading:false,
                isRetrieved:true,
                twitter:action.payload
                }
        default:
            return state
    }
}