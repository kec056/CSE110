import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

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
      <div id="app">
        <Menu user={currentUser} logout={this.logout}/>

        {this.props.children}

      </div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, App);