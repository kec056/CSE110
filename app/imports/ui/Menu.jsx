import React, { Component, PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

import { Link } from 'react-router';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import AddButton from 'material-ui/svg-icons/content/add';
import AddTaskButton from './AddTaskButton.jsx';

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  //handleToggle = () => this.setState({open: !this.state.open});
  handleToggle() {
    this.setState(
      {open: !this.state.open}
    );
  }

  handleClose(name) {
    this.setState(
      {open: false }
    );
  }

  handleLogOut() {
    this.setState({
      open: false
    });
    Meteor.logout();
  }

  render() {
    const { user } = this.props;
    let email = "";
    if (user)
      email = user.emails[0].address;

    switch (this.props.path) {
      case "/":
        this.title = "Tasks";
        break;
      case "/calendar":
        this.title = "Calendar";
        break;
      case "/social":
        this.title = "Social";
        break;
      case "/settings":
        this.title = "Settings";
        break;
      case "/signin":
        this.title = "Sign In";
        break;
      case "/signup":
        this.title = "Register";
        break;
      case "/forgotpassword":
        this.title = "Forgot Password";
        break;
      default:
        if (this.props.path.includes("reset-password"))
          this.title = "Reset Password";
        break;
    }

    return (
      <div>
        { this.props.path == "/" ?
          <AppBar
            title={this.title}
            onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
            iconElementRight={<AddTaskButton/>}
          /> :
          <AppBar
            title={this.title}
            onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
          />
        }
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
          <MenuItem
            linkButton
            containerElement={<Link id="social" to="/social" />}
            onTouchTap={this.handleClose.bind(this)}
          >
            Social
          </MenuItem>

          <MenuItem
            linkButton
            containerElement={<Link id="settings" to="/settings" />}
            onTouchTap={this.handleClose.bind(this)}
          >
            Settings
          </MenuItem>

          { !user ?
            <MenuItem
              linkButton
              containerElement={<Link to="/signup" />}
              onTouchTap={this.handleClose.bind(this)}
              id="register"
              style={{
                  position: 'absolute'
              }}
            >
              Register
            </MenuItem> : ''
          }
          { !user ?
            < MenuItem
              linkButton
              containerElement={<Link to="/signin" />}
              onTouchTap={this.handleClose.bind(this)}
              id="login"
              style={{
                position: 'absolute'
              }}
            >
              Sign In
            </MenuItem> : ''
          }
          { user ?
            < MenuItem
              disabled
              id="user-email"
              style={{
                position: 'absolute',
                lineHeight: '36px'
              }}
            >
              Signed in as:<br/>{email}
            </MenuItem> : ''
          }
          { user ?
            < MenuItem
              linkButton
              containerElement={<Link to="/" />}
              onTouchTap={this.handleLogOut.bind(this)}
              id="logout"
              style={{
                position: 'absolute'
              }}
            >
              Sign Out
            </MenuItem> : ''
          }
        </Drawer>
      </div>
    );
  }
  
}

Menu.propTypes = {
  user: PropTypes.object,
};