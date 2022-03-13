import {GET_MEMBERS} from "../types/memberType";

const initialState = {
    members: [],
    member: {}
}

const memberReducer = (state=initialState, action)=>{
    switch(action.type){
        case GET_MEMBERS:
            return{
                ...state,
                members:action.payload
            }
            default:
                return state
    }
}

export default memberReducer;