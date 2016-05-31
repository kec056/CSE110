import React, { Component, PropTypes } from 'react';
import Cronofy from 'cronofy';
import { Meteor } from 'meteor/meteor';

const cronofyConf = require('../../../secret/cronofy.json');

Meteor.methods({
  'oauth.getToken'(code) {
    if (!this.userId) {
      throw new Meteor.Error('oauth.getToken called while not logged in');
    }

    cronofyConf.code = code;
    cronofyConf.redirect_uri = 'http://localhost:3000/settings/calendars';

    return Cronofy.requestAccessToken(cronofyConf);
  },

  // @param code One-time use code from Cronofy to trade for an auth token object
  'user.addCalendarByCode'(code) {
    if (!this.userId) {
      throw new Meteor.Error('user.addCalendarByCode called while not logged in');
    }

    return Meteor.call('oauth.getToken', code)
      .then(tokenObj => {
        // Initialize cronofy token array in user document if no tokens exist yet
        Meteor.users.update(
          { _id: this.userId, 'services.cronofy': { $exists: false } },
          { $set: { 'services.cronofy': [] } }
        );

        Meteor.users.update(this.userId, {
          $push: {
            'services.cronofy': tokenObj,
          },
        });
      });
  },
});


export default class ManageExternalCalendars extends Component {
  render() {
    // Did the user just authorize the app to query Cronofy for their calendars?
    // If so, a one-time use code to get a query token is in the URL
    const code = this.props.location.query.code;
    if (code) {
      Meteor.call('user.addCalendarByCode', code)
        .then(() => { console.log('forcing update'); this.forceUpdate(); });
    }

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
  }
}

ManageExternalCalendars.propTypes = {
  user: PropTypes.object,
};
