//built dependencies   
   //imports all functions from the 'types' file
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'

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
            )
}

  //adds a single item
  //uses the POST function to post the new item
export const addItem = (item) => dispatch => {
    axios
        .post('api/items', item)
        .then(res => 
            dispatch({
                type:ADD_ITEM,
                payload:res.data
            })
        )
}

    //deletes a single item
export const deleteItem = (id) => dispatch => {
   axios.delete(`/api/items/${id}`).then(res => dispatch({
       type: DELETE_ITEM,
       payload: id
   }))
} 
  
    //triggers when retrieving data
export const setItemsLoading = () =>{
    return {
        type: ITEMS_LOADING
    }
}