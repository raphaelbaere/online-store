import React, { Component } from 'react';

const INITIAL_STATE = {
  List: [],
};

export default class Home extends Component {
  state = INITIAL_STATE;

  render() {
    const { List } = this.state;
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
      </div>
    );
  }
}
