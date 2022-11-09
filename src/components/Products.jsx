import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { handleAddToCart } from '../services/api';

class Products extends Component {
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
          onClick={ () => handleAddToCart(title, price, id) }
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
