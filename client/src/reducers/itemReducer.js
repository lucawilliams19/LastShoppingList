
//built components
import { GET_ITEMS, 
    ADD_ITEM, 
    DELETE_ITEM, 
    ITEMS_LOADING 
} from '../actions/types'

const initialState = {
    items: [],
    loading: false
}

function itemReducer(state = initialState, action){
    switch(action.type) {
            //GET_ITEMS retrieves items. Once data is recieved loading is set to off
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading:false
            }
        case DELETE_ITEM:
            return {
                ...state, 
                items: state.items.filter(item => item._id !== action.payload)
            }
            //does not directly interact with state, makes copy
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case ITEMS_LOADING:
            return{
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default itemReducer