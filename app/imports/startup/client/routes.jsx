import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import Tasklist from '../../ui/Tasklist.jsx';
import App from '../../ui/App.jsx';
import Calendar from '../../ui/Calendar.jsx';
import Social from '../../ui/Social.jsx';
import SignUpPage from '../../ui/SignUpPage.jsx';
import SignInPage from '../../ui/SignInPage.jsx';
import ForgotPasswordPage from '../../ui/ForgotPasswordPage.jsx';
import ResetPasswordPage from '../../ui/ResetPasswordPage.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Tasklist} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/social" component={Social} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/signin" component={SignInPage} />
      <Route path="/forgotpassword" component={ForgotPasswordPage} />
      <Route path="/reset-password/:token" component={ResetPasswordPage} />
    </Route>
  </Router>
);