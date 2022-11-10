// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CartItem from '../components/CartItem';

class ShoppingCart extends Component {
  state = {
    cartItems: [],
  };

  componentDidMount() {
    this.refreshCartitems();
  }

  updateChild = () => {
    this.refreshCartitems();
  };

  refreshCartitems = () => {
    const currentLocalStorage = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.setState({ cartItems: currentLocalStorage });
  };

  render() {
    const { cartItems } = this.state;
    console.log(cartItems);
    return (
      <div>
        { cartItems.length === 0 ? (
          <p
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </p>
        ) : (
          cartItems.map((cartItem) => (<CartItem
            key={ cartItem.id }
            { ...cartItem }
            update={ this.updateChild }
          />
          ))
        )}
      </div>
    );
  }
}

// ShoppingCart.propTypes = {
// second: third
// };

export default ShoppingCart;
