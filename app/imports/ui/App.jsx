import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import Menu from './Menu.jsx';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      currentUser
    } = this.props;

    return (
      <div id="app">
        <MuiThemeProvider muiTheme={muiTheme}>
          <Menu path={this.props.location.pathname} user={currentUser} />
        </MuiThemeProvider>

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