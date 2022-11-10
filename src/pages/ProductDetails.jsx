import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getProductById, handleAddToCart } from '../services/api';

class ProductDetails extends Component {
  state = {
    properties: {},
    hasLoaded: false,
    redirect: false,
    inputEmail: '',
    textarea: '',
    validationForm: false,
    note: '1',
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
   
  validationButton = () => {
    const { inputEmail, textarea } = this.state;

    if (inputEmail.length > 0 && textarea.length > 0) {
      this.setState({
        validationForm: true,
      });
    }
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validationButton);
    console.log(value);
  };


  render() {
    const { properties: { title, thumbnail, price, id },
      hasLoaded, redirect, inputEmail, validationForm, textarea, note } = this.state;


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
        <form>
          <input type="email" name='inputEmail' value={ inputEmail } onChange={ this.handleInputChange } data-testid="product-detail-email" placeholder='Digite seu email' required />
          <div onChange={ this.handleInputChange }>
          <input
            checked={ note === '1' }
            value='1'
            type='radio'
            name='note'
            data-testid="1-rating"
          />
          <input
            checked={ note === '2' }
            value='2'
            type='radio'
            name='note'
            data-testid="2-rating"
          />
          <input
            checked={ note === '3' }
            value='3'
            type='radio'
            name='note'
            data-testid="3-rating"
          />
          <input
            checked={ note === '4' }
            value='4'
            type='radio'
            name='note'
            data-testid="4-rating"
          />
          <input
            checked={ note === '5' }
            value='5'
            type='radio'
            name='note'
            data-testid="5-rating"
          />
          </div>
          <textarea name='textarea' value={ textarea } onChange={ this.handleInputChange } data-testid="product-detail-evaluation" />
          <button type='button' data-testid='submit-review-btn' disabled={ !validationForm }> Enviar</button>
          { !validationForm && <p data-testid="error-msg"> Campos inválidos </p>

          }
        </form>
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
