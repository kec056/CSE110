import React, { PropTypes } from 'react';

const cronofyConf = require('../../../secret/cronofy.json');

export default ManageExternalCalendars = (props) => {
  const oauthUrl =
    `${cronofyConf.oauth_url}` +
    '?response_type=code' +
    `&client_id=${cronofyConf.client_id}` +
    '&redirect_uri=http://localhost:3000/settings/calendars' +
    '&scope=read_account list_calendars read_events';

  return (
    <div className="container ManageExternalCalendars">
      <h2>External calendars</h2>
      <p>
        <span>Events from synced external calendars will appear in your Commulist calendar.</span>
      </p>
      <p>
        <a href={oauthUrl}>Authorize Commulist to make Cronofy API calls</a>
      </p>
    </div>
  );
};

ManageExternalCalendars.propTypes = {
  user: PropTypes.object,
};
