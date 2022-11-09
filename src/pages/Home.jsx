import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    redirectToShoppingCart: false,
    List: [],
    queryInput: '',
    categories: 'MLB1384',
  };

  handleOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleQueryButton = async () => {
    const { categories, queryInput } = this.state;
    const response2 = await getProductsFromCategoryAndQuery(categories, queryInput);
    console.log(response2);
  };

  render() {
    const { redirectToShoppingCart, List, queryInput } = this.state;
    return (
      <div>
        <input
          data-testid="query-input"
          value={ queryInput }
          name="queryInput"
          onChange={ this.handleOnChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleQueryButton }
        >
          Query!
        </button>
        {
          List.length === 0
          && (
            <h1 data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h1>
          )
        }
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ () => this.setState({ redirectToShoppingCart: true }) }
        >
          Carrinho de compras
        </button>
        { redirectToShoppingCart && <Redirect to="/shoppingCart" />}
      </div>
    );
  }
}

export default Home;
