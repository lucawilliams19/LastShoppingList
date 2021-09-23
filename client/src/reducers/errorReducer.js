//import types of errors
import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

const initialState = {
    msg: {},
    status: null,
    id: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        //GET_ITEMS retrieves items. Once data is recieved loading is set to off
    case GET_ERRORS:
        return {
            msg: action.payload.msg,
            status: action.payload.status,
            id: action.payload.id
        }
        case CLEAR_ERRORS:
            return {
                msg: {},
                status: null,
                id: null
            }
    
        default:
            return state
    }   
}

    