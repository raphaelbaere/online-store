import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getProductById, handleAddToCart } from '../services/api';

class ProductDetails extends Component {
  state = {
    properties: {},
    hasLoaded: false,
    redirect: false,
  };

  async componentDidMount() {
    console.log(this.props);
    const { match } = this.props;
    const { params: { id } } = match;
    const response = await getProductById(id);
    const { title, thumbnail, price } = response;
    this.setState({
      hasLoaded: true,
      properties: {
        title,
        thumbnail,
        price,
        id,

      },
    });
  }

  redirectToCart = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { properties: { title, thumbnail, price, id },
      hasLoaded, redirect } = this.state;

    return (
      <div>
        { hasLoaded && (
          <>
            <p data-testid="product-detail-name">{ title }</p>
            <img
              data-testid="product-detail-image"
              src={ thumbnail }
              alt={ title }
            />
            <p data-testid="product-detail-price">{ price }</p>
            <button
              data-testid="product-detail-add-to-cart"
              type="button"
              onClick={ () => handleAddToCart(title, price, id) }
            >
              Add to cart
            </button>

          </>
        )}
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ this.redirectToCart }
        >
          Ir para carrinho!
        </button>
        { redirect && <Redirect to="/shoppingCart" />}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
