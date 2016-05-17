import React, { Component, PropTypes } from 'react';

import Menu from './Menu.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    Meteor.logout();
  }

  render() {
    const {
      currentUser
    } = this.props;

    return (
      <div class="container">
        <Menu user={currentUser} logout={this.logout}/>

        {this.props.children}

      </div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
};
