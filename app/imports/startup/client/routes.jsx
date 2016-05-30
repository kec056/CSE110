import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// route components
import Tasklist from '../../ui/Tasklist.jsx';
import App from '../../ui/App.jsx';
import Calendar from '../../ui/Calendar.jsx';
import Social from '../../ui/Social.jsx';

import Settings from '../../ui/settings/Settings.jsx';
import ManageExternalCalendars from '../../ui/settings/ManageExternalCalendars.jsx';

import SignUpPage from '../../ui/SignUpPage.jsx';
import SignInPage from '../../ui/SignInPage.jsx';
import ForgotPasswordPage from '../../ui/ForgotPasswordPage.jsx';
import ResetPasswordPage from '../../ui/ResetPasswordPage.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Tasklist} />
      <Route path="calendar" component={Calendar} />
      <Route path="social" component={Social} />

      <Route path="settings">
        <IndexRoute component={Settings} />
        <Route path="calendars" component={ManageExternalCalendars} />
      </Route>

      <Route path="signup" component={SignUpPage} />
      <Route path="signin" component={SignInPage} />
      <Route path="forgotpassword" component={ForgotPasswordPage} />
      <Route path="reset-password/:token" component={ResetPasswordPage} />
    </Route>
  </Router>
);
