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
    console.log("HI");

    //let scheduledTasks = Tasks.find({schedule: true, auto: false});
    let scheduledTasks = this.props.tasks;
    console.log(Tasks.find({schedule: true, auto: false}).count());
    scheduledTasks.forEach(function(task) {
      let startYear = task.startDate.getFullYear();
      let startMonth = task.startDate.getMonth();
      let startDay = task.startDate.getDate();
      let startHour = task.startTime.getHours();
      let startMin = task.startTime.getMinutes();
      let endYear = task.endDate.getFullYear();
      let endMonth = task.endDate.getMonth();
      let endDay = task.endDate.getDate();
      let endHour = task.endTime.getHours();
      let endMin = task.endTime.getMinutes();
      eventsArray.push({
        'title': task.text,
        'start': new Date(startYear, startMonth, startDay, startHour, startMin, 0),
        'end': new Date(endYear, endMonth, endDay, endHour, endMin, 0),
        '_id': task._id,
      })
    });

    //let eventArray = events();
    return (
      <div className="container" >
        <BigCalendar
          selectable
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
        />
      </div>
    );
  }
}


Calendar.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({schedule: true, auto: false}).fetch(),
  };
}, Calendar);