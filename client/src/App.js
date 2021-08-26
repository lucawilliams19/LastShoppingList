//dependencies
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';

//built components
  //App Navbar built with react and reactstrap
import AppNavbar from './components/AppNavbar';
  //"Add Item" button
import ItemModal from './components/ItemModal';
  //Holds add item and Container that holds listGroup of task items with a delte button next to each task
import ShoppingList from './components/ShoppingList';


import './App.css';
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container> 
          <ItemModal />
          <ShoppingList />
        </Container>
        
      </div>
    </Provider>
    
  );
}

export default App;
