import React, { Component } from 'react';

import Menu from './Menu.jsx';

export default class App extends Component {
  render() {
    return (
      <div class="container">
        <Menu />

        {this.props.children}

      </div>
    );
  }
}
