import React from 'react';
import { Component, PropTypes } from 'react';

import { Link } from 'react-router';
import BigCalendar from 'react-big-calendar';
import { moment } from 'meteor/momentjs:moment';

import events from './events.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

export default class Calendar extends Component {
  render() {
    return (
      <div className="container">
        <BigCalendar
          events={events}
          defaultDate={new Date(2015, 3, 1)}
          formats={{
            dayFormat: 'ddd MM/DD',
            dayHeaderFormat: 'ddd MMM DD',
          }}
        />
      </div>
    );
  }
}
