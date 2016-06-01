import React from 'react';
import { Component, PropTypes } from 'react';

import BigCalendar from 'react-big-calendar';
import { moment } from 'meteor/momentjs:moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Tasks } from '../api/Tasks.js';
import { createContainer } from 'meteor/react-meteor-data';

BigCalendar.momentLocalizer(moment);

export class Calendar extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let eventsArray = new Array();

    let scheduledTasks = this.props.tasks;
    scheduledTasks.forEach(function(task) {
      eventsArray.push({
        'title': task.text,
        'start': new Date(task.startDate.getFullYear(), task.startDate.getMonth(), task.startDate.getDate(),
          task.startTime.getHours(), task.startTime.getMinutes(), 0),
        'end': new Date(task.endDate.getFullYear(), task.endDate.getMonth(), task.endDate.getDate(),
          task.endTime.getHours(), task.endTime.getMinutes(), 0),
      })
    });

    return (
      <div className="container" >
        <BigCalendar
          events={eventsArray}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={(slotInfo) => alert(
            'selected slot: \n\nstart ${slotInfo.start.toLocaleString()}' +
            '\nend: ${slotInfo.end.toLocaleString()}'
          )}
          formats={{
            dayFormat: 'ddd MM/DD',
            dayHeaderFormat: 'ddd MMM DD',
          }}
          views={['month', 'week', 'day']}
        />
      </div>
    );
  }
}


Calendar.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({schedule: true, auto: false}).fetch(),
  };
}, Calendar);
