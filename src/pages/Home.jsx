import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Products from '../components/Products';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    redirectToShoppingCart: false,
    List: [],
    queryInput: '',
    categories: 'MLB1384',
    resultQueryProducts: [],
  };

  handleOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleQueryButton = async () => {
    const { categories, queryInput } = this.state;
    const queryProducts = await getProductsFromCategoryAndQuery(categories, queryInput);
    const resultQueryProducts = queryProducts.results;
    console.log(resultQueryProducts);
    this.setState({ resultQueryProducts });
  };

  render() {
    const { redirectToShoppingCart, List, queryInput, resultQueryProducts } = this.state;
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
        {
          !resultQueryProducts.length ? (
            <p>Nenhum produto foi encontrado</p>
          ) : (
            resultQueryProducts
              .map((result) => <Products key={ result.id } { ...result } />)
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
