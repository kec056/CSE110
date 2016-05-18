import React, { Component } from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import AuthPage from './AuthPage.jsx';

export default class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.refs.email.value;
    const errors = {};

    if (!email) {
      errors.email = 'Email required';
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Accounts.forgotPassword({ email: email }, err => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
        this.context.router.push('/forgotpassword');
      }
      else {
        this.context.router.push('/');
      }
    });
  }
  
  render() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    const content = (
      <div className="wrapper-auth">
        <h1 className="title-auth">Forgot Password</h1>
        <p className="subtitle-auth">Enter email used for your account</p>
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
          <button type="submit" className="btn-primary">Continue</button>
        </form>
      </div>
    );
    
    const link = <Link to="/signin" className="link-sign-in-alt">Go back to login page.</Link>;
    
    return <AuthPage content={content} link={link} />;
  }
}

ForgotPasswordPage.contextType = {
  router: React.PropTypes.object,
};
