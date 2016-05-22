import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default Settings = props => (
  <div className="container">
    <Link id="calendars" to="/settings/calendars">Manage external calendars</Link>
  </div>
);

Settings.propTypes = {
  user: PropTypes.object,
};
