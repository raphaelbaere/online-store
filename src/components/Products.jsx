import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Products extends Component {
  render() {
    const { title, price, thumbnail } = this.props;

    return (
      <div
        data-testid="product"
      >
        <h1>{ title }</h1>
        <img
          alt={ title }
          src={ thumbnail }
        />
        <p>{ price }</p>
      </div>
    );
  }
}

Products.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default Products;
