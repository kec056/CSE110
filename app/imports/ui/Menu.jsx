import React, { Component, PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

import { Link } from 'react-router';
import { LoginState } from 'meteor/brettle:accounts-login-state';

import AddTaskButton from './AddTaskButton.jsx';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import ActionDone from 'material-ui/svg-icons/action/done';
import DateRange from 'material-ui/svg-icons/action/date-range';
import SocialPeople from 'material-ui/svg-icons/social/people';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionHelp from 'material-ui/svg-icons/action/help';
import ActionFace from 'material-ui/svg-icons/action/face';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ActionInput from 'material-ui/svg-icons/action/input';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleToggle() {
    this.setState(
      { open: !this.state.open }
    );
  }

  handleClose() {
    this.setState(
      { open: false }
    );
  }

  handleLogOut() {
    this.setState({
      open: false,
    });
    Meteor.logout();
  }

  render() {
    const { user } = this.props;
    let email = "";
    if (user && user.hasOwnProperty('emails'))
      email = user.emails[0].address;
    }

    switch (this.props.path) {
      case '/':
        this.title = 'Tasks';
        break;
      case '/calendar':
        this.title = 'Calendar';
        break;
      case '/social':
        this.title = 'Social';
        break;
      case '/settings':
        this.title = 'Settings';
        break;
      case '/signin':
        this.title = 'Sign In';
        break;
      case '/signup':
        this.title = 'Register';
        break;
      case '/forgotpassword':
        this.title = 'Forgot Password';
        break;
      default:
        if (this.props.path.includes('reset-password'))
          this.title = 'Reset Password';
        break;
    }

    return (
      <div>
        {this.props.path === '/' ?
          <AppBar
            title={this.title}
            onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
            iconElementRight={<AddTaskButton />}
          /> :
          <AppBar
            title={this.title}
            onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
          />
        }
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <List style={{ padding: '0px 0px' }}>
            <ListItem
              primaryText="TEAM TROLL"
              disabled
              style={{
                textAlign: 'center',
                color: 'grey',
                padding: '16px 16px 0 16px',
              }}
            />
            <Avatar
              size={60}
              style={{
                display: 'block',
                margin: '18px auto 18px auto',
              }}
            >
              T
            </Avatar>
            {user ?
              <ListItem
                primaryText={email}
                disabled
                style={{
                  textAlign: 'center',
                  color: 'grey',
                  padding: '0 16px 16px 16px',
                }}
              /> : ''
            }
            <Divider />
            <ListItem
              primaryText="Tasks"
              leftIcon={<ActionDone />}
              linkButton
              containerElement={<Link id="tasks" to="/" />}
              onTouchTap={this.handleClose.bind(this)}
            />
            <ListItem
              primaryText="Calendar"
              leftIcon={<DateRange />}
              linkButton
              containerElement={<Link id="calendar" to="calendar" />}
              onTouchTap={this.handleClose.bind(this)}
            />
            <ListItem
              primaryText="Social"
              leftIcon={<SocialPeople />}
              linkButton
              containerElement={<Link id="social" to="social" />}
              onTouchTap={this.handleClose.bind(this)}
            />
            <Divider />
            <ListItem
              primaryText="Settings"
              leftIcon={<ActionSettings />}
              linkButton
              containerElement={<Link id="settings" to="settings" />}
              onTouchTap={this.handleClose.bind(this)}
            />
            <ListItem
              primaryText="Help Center"
              leftIcon={<ActionHelp />}
              onTouchTap={this.handleClose.bind(this)}
            />
            <ListItem
              primaryText="About Us"
              leftIcon={<ActionFace />}
              onTouchTap={this.handleClose.bind(this)}
            />
            { !LoginState.signedUp() ?
              <ListItem
                primaryText="Register"
                leftIcon={<PersonAdd />}
                linkButton
                containerElement={<Link to="signup" />}
                onTouchTap={this.handleClose.bind(this)}
                id="register"
                style={{
                  position: 'absolute',
                }}
              /> : ''
            }
            { !LoginState.signedUp() ?
              <ListItem
                primaryText="Sign In"
                leftIcon={<ActionInput />}
                linkButton
                containerElement={<Link to="signin" />}
                onTouchTap={this.handleClose.bind(this)}
                id="login"
                style={{
                  position: 'absolute',
                }}
              /> : ''
            }
            { LoginState.signedUp() ?
              <ListItem
                primaryText="Sign Out"
                leftIcon={<ArrowBack />}
                linkButton
                containerElement={<Link to="/" />}
                onTouchTap={this.handleLogOut.bind(this)}
                id="logout"
                style={{
                  position: 'absolute',
                }}
              /> : ''
            }
          </List>

        </Drawer>
      </div>
    );
  }

}

Menu.propTypes = {
  user: PropTypes.object,
};
