//built components 
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'


//dependencies
    //axois is a PROMISED BASED client that makes and intercepts requests. 
    //lives on the server and client side and allows requests and responses to be intercepted and managed 
    //ex. cancels a request before it ever hits the server
import axios from 'axios'



    //retrieves all items
export const getItems = () => dispatch => {
    dispatch(setItemsLoading())
    axios
        .get('api/items')
        .then(res=> 
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

  //adds a single item
  //uses the POST function to post the new item
export const addItem = (item) => (dispatch, getState) => {
    axios
        .post('api/items', item, tokenConfig(getState))
        .then(res => 
            dispatch({
                type:ADD_ITEM,
                payload:res.data
            })
        ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

    //deletes a single item
export const deleteItem = (id) => (dispatch, getState) => {
   axios
   .delete(`/api/items/${id}`, tokenConfig(getState))
   .then(res => dispatch({
       type: DELETE_ITEM,
       payload: id
   })).catch(err => 
    dispatch(returnErrors(err.response.data, err.response.status)))
} 
  
    //triggers when retrieving data
export const setItemsLoading = () =>{
    return {
        type: ITEMS_LOADING
    }
}