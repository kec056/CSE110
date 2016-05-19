import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

import { Link } from 'react-router';
import FaList from 'react-icons/lib/fa/list';

export default class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  //handleToggle = () => this.setState({open: !this.state.open});
  handleToggle() {
    this.setState(
      {open: !this.state.open}
    );
  }

  handleClose() {
    this.setState(
      {open: false}
    );
  }

  render() {
    return (
      <div>
        <AppBar
          title={this.props.title}
          onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem
            linkButton
            containerElement={<Link id="tasks" to="/" />}
            onTouchTap={this.handleClose.bind(this)}
          >
            Tasks
          </MenuItem>
          <MenuItem
            linkButton
            containerElement={<Link id="calendar" to="/calendar" />}
            onTouchTap={this.handleClose.bind(this)}
          >
            Calendar
          </MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
  
}
