import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Home extends Component {
  state = {
    redirectToShoppingCart: false,
    List: [],
  };

  render() {
    const { redirectToShoppingCart, List } = this.state;
    return (
      <div>
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
