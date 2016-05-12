import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';


import { Router, Route, browserHistory } from 'react-router';
import Page from '../imports/ui/Page.jsx';

Meteor.startup(() => {
  //render(<App />, document.getElementById('render-target'));
  render(
      <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/new" component={Page} />
      </Router>,
      document.getElementById('render-target')
  );
});
