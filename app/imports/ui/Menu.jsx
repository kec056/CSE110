import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import FaList from 'react-icons/lib/fa/list';
import FaCalendarCheckO from 'react-icons/lib/fa/calendar-check-o';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';

let BurgerMenu = require('react-burger-menu').slide;

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  renderLoggedIn() {
    const { user, logout } = this.props;

    return (
      <div class="bm-menu">
        <BurgerMenu class="bm-item-list" isOpen={this.state.isOpen}>
          <Link id="tasks" to="/">
            <FaList />
            <span>Tasks</span>
          </Link>
          <Link id="calendar" to="/calendar">
            <FaCalendarCheckO />
            <span>Calendar</span>
          </Link>
          <Link id="social" to="#">
            <FaFacebookOfficial />
            <span>Social</span>
          </Link>
          <Link id="logout" to="#" onClick={logout}>
            <span>Logout</span>
          </Link>
        </BurgerMenu>
      </div>
    );
  }

  renderLoggedOut() {
    return (
      <div class="bm-menu">
        <BurgerMenu class="bm-item-list" isOpen={this.state.isOpen}>
          <Link id="tasks" to="/">
            <FaList />
            <span>Tasks</span>
          </Link>
          <Link id="calendar" to="/calendar">
            <FaCalendarCheckO />
            <span>Calendar</span>
          </Link>
          <Link id="social" to="#">
            <FaFacebookOfficial />
            <span>Social</span>
          </Link>
          <Link id="register" to="#">
            <span>Register</span>
          </Link>
          <Link id="login" to="#">
            <span>Login</span>
          </Link>
        </BurgerMenu>
      </div>
    );
  }

  render() {
    return this.props.user
      ? this.renderLoggedIn()
      : this.renderLoggedOut();
  }
}

Menu.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};