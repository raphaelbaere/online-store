import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Products extends Component {
  handleAddToCart = (title, price, id) => {
    const currentLocalStorage = JSON.parse(localStorage.getItem('cartItems')) || [];

    const indexOfExistent = currentLocalStorage
      .findIndex((cartItems) => cartItems.id === id);

    const INDEX_OF_NO_EXISTENT = -1;
    if (indexOfExistent !== INDEX_OF_NO_EXISTENT) {
      currentLocalStorage[indexOfExistent].quantity += 1;
    } else {
      const product = {
        title,
        price,
        id,
        quantity: 1,
      };
      currentLocalStorage.push(product);
    }

    localStorage.setItem('cartItems', JSON.stringify(currentLocalStorage));
  };

  render() {
    const { title, price, thumbnail, id } = this.props;

    return (
      <div
        data-testid="product"
      >
        <Link
          to={ `/productDetails/${id}` }
          data-testid="product-detail-link"
        >
          <h1>{ title }</h1>
          <img
            alt={ title }
            src={ thumbnail }
          />
          <p>{ price }</p>
        </Link>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ () => this.handleAddToCart(title, price, id) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

Products.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default Products;
