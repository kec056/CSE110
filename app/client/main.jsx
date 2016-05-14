import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Tasklist from '../imports/ui/Tasklist.jsx';
import App from '../imports/ui/App.jsx';

import { Router, Route, browserHistory } from 'react-router';
import Calendar from '../imports/ui/Calendar.jsx';

Meteor.startup(() => {
  //render(<Tasklist />, document.getElementById('render-target'));
  render(
      <Router history={browserHistory}>
        <Route component={App}>
          <Route path="/" component={Tasklist} />
          <Route path="/calendar" component={Calendar} />
        </Route>
      </Router>,
      document.getElementById('render-target')
  );
});
