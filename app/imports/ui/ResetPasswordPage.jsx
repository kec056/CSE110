import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import AuthPage from './AuthPage.jsx';

export default class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const password = this.refs.password.value;
    const confirmPass = this.refs.confirmPass.value;
    const errors = {};

    if (!password) {
      errors.password = 'Password required';
    }

    if (confirmPass !== password) {
      errors.confirmPass = 'Passwords do not match';
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Accounts.resetPassword(this.props.params.token, password, (err) => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
        browserHistory.push('/reset-password/:token');
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
        <h1 className="title-auth">Reset Password</h1>
        <p className="subtitle-auth" >Enter and confirm new password</p>
        <form onSubmit={this.onSubmit}>
          <div className="list-errors">
            {errorMessages.map(msg => (
              <div className="list-item" key={msg}>{msg}</div>
            ))}
          </div>
          <div className={`input-symbol ${errorClass('password')}`}>
            <input type="password" name="password" ref="password" placeholder="Password" />
            <span className="icon-lock" title="Password" />
          </div>
          <div className={`input-symbol ${errorClass('confirmPass')}`}>
            <input type="password" name="confirmPass" ref="confirmPass" placeholder="Confirm Password" />
            <span className="icon-lock" title="Confirm Password" />
          </div>
          <button type="submit" className="btn-primary">Reset Password</button>
        </form>
      </div>
    );

    const link = <Link to="/signin" className="link-sign-in-alt">Go back to login page.</Link>;

    return <AuthPage content={content} link={link} />;
  }
}

ResetPasswordPage.propTypes = {
  params: React.PropTypes.object,
};
