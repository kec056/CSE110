import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Tasklist from '../imports/ui/Tasklist.jsx';
import App from '../imports/ui/App.jsx';
import Calendar from '../imports/ui/Calendar.jsx';
import SignUpPage from '../imports/ui/SignUpPage.jsx';
import SignInPage from '../imports/ui/SignInPage.jsx';

import { Router, Route, browserHistory } from 'react-router';

Meteor.startup(() => {
  //render(<Tasklist />, document.getElementById('render-target'));
  render(
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={Tasklist} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signin" component={SignInPage} />
      </Route>
    </Router>,
    document.getElementById('render-target')
  );
});
