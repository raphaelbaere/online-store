import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CartItem extends Component {
  render() {
    const { title, quantity } = this.props;

    return (
      <div>
        <p data-testid="shopping-cart-product-name">{ title }</p>
        <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
      </div>
    );
  }
}

CartItem.propTypes = {
  title: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
};

export default CartItem;
