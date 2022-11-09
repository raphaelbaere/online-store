import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
