import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Products from '../components/Products';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';

class Home extends Component {
  state = {
    redirectToShoppingCart: false,
    categories: [],
    queryInput: '',
    currentCategory: '',
    resultQueryProducts: [],
  };

  async componentDidMount() {
    const requestApi = await this.requestApi();
    this.setState({
      categories: requestApi,
    });
  }

  requestApi = async () => {
    const api = await getCategories();
    return api;
  };

  setCategory = (id) => {
    this.setState({
      currentCategory: id,
    });
  };

  handleCategory = (param) => {
    const categories = param.map(({ name, id }) => (
      <label key={ id } htmlFor={ id } data-testid="category">
        <input
          onClick={ () => this.setCategory(id) }
          name={ name }
          id={ id }
          type="radio"
        />
        { name }
      </label>
    ));
    return categories;
  };

  handleOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleQueryButton = async () => {
    const { currentCategory, queryInput } = this.state;
    const queryProducts = await
    getProductsFromCategoryAndQuery(currentCategory, queryInput);
    const resultQueryProducts = queryProducts.results;
    console.log(resultQueryProducts);
    this.setState({ resultQueryProducts });
  };

  render() {
    const { redirectToShoppingCart, categories, queryInput,
      resultQueryProducts } = this.state;
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
        {categories.length === 0 ? (
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
        ) : (
          <div>{this.handleCategory(categories)}</div>
        )}
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
