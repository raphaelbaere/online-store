// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CartItem from '../components/CartItem';

class ShoppingCart extends Component {
  state = {
    cartItems: [],
    goToCheckout: false,
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

  handleCheckout = () => {
    this.setState({
      goToCheckout: true,
    });
  };

  render() {
    const { cartItems, goToCheckout } = this.state;
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
        <button
          type="button"
          data-testid="checkout-products"
          onClick={ this.handleCheckout }
        >
          Fechar compra

        </button>
        { goToCheckout && <Redirect to="/checkout" /> }
      </div>
    );
  }
}

// ShoppingCart.propTypes = {
// second: third
// };

export default ShoppingCart;
