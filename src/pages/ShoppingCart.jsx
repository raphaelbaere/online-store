// import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ShoppingCart extends Component {
  render() {
  // const { props } = this.props;

    return (
      <div>
        <p
          data-testid="shopping-cart-empty-message"
        >
          Seu carrinho está vazio
        </p>
      </div>
    );
  }
}

// ShoppingCart.propTypes = {
// second: third
// };

export default ShoppingCart;
