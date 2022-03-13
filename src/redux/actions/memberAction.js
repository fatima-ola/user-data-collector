import {GET_MEMBERS} from "../types/memberType";
// import * as types from "../types/memberType;
import axios from "axios";


//get members is the action creator

export const getMembers = ()=>{
    return async (dispatch)=>{
        try{
            const res= await axios.get("http://localhost:4500/biodata")
        dispatch({
            type: GET_MEMBERS,
            payload: res.data
        })

        }catch(error){
            console.log(error)
        }
    }
}