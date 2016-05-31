import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import AuthPage from './AuthPage.jsx';
import { Link, browserHistory } from 'react-router';

export default class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const errors = {};

    if (!email) {
      errors.email = 'Email required';
    }
    if (!password) {
      errors.password = 'Password required';
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
        browserHistory.push('/signin');
      } else {
        browserHistory.push('/');
      }
    });
  }

  render() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    const content = (
      <div className="wrapper-auth">
        <p className="subtitle-auth">Warning: Logging in will delete all local tasks and replace it with cloud-synced tasks of the account being logged into.</p>
        <form onSubmit={this.onSubmit}>
          <div className="list-errors">
            {errorMessages.map(msg => (
              <div className="list-item" key={msg}>{msg}</div>
            ))}
          </div>
          <div className={`input-symbol ${errorClass('email')}`}>
            <input type="email" name="email" ref="email" placeholder="Your Email" />
            <span className="icon-email" title="Your Email" />
          </div>
          <div className={`input-symbol ${errorClass('password')}`}>
            <input type="password" name="password" ref="password" placeholder="Password" />
            <span className="icon-lock" title="Password" />
          </div>
          <button type="submit" className="btn-primary">Sign in</button>
          <Link id="forgotpassword" to="/forgotpassword">
            <span><br />Forgot Password?</span>
          </Link>
        </form>
      </div>
    );

    const link = <Link to="/signup" className="link-sign-up-alt">Need an account? Sign Up.</Link>;

    return <AuthPage content={content} link={link} />;
  }
}
