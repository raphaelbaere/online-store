import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <div className="App">
      <Route path="/" component={ Home } />
      <Route path="/shoppingCart" component={ ShoppingCart } />
    </div>
  );
}

export default App;
