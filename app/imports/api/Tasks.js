import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'tasks.insert'(text, time, priority, checked, schedule, auto,
    startDate, endDate, startTime, endTime, duration, rep) {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    if (text !== '') {
      if (!schedule) {
        Tasks.insert({
          text,
          time,
          priority,
          checked,
          schedule,
          auto,
          startDate,
          endDate,
          startTime,
          endTime,
          duration,
          rep,
          owner: Meteor.userId(),
          username: Meteor.user().emails,
          createdAt: new Date(),
        });
      } else if (schedule && !auto) {
        if (startDate !== undefined && endDate !== undefined &&
          startTime !== undefined && endTime !== undefined) {
          Tasks.insert({
            text,
            time,
            priority,
            checked,
            schedule,
            auto,
            startDate,
            endDate,
            startTime,
            endTime,
            duration,
            rep,
            owner: Meteor.userId(),
            username: Meteor.user().emails,
            createdAt: new Date(),
          });
        }
      } else if (schedule && auto) {
        Tasks.insert({
          text,
          time,
          priority,
          checked,
          schedule,
          auto,
          startDate,
          endDate,
          startTime,
          endTime,
          duration,
          rep,
          owner: Meteor.userId(),
          username: Meteor.user().emails,
          createdAt: new Date(),
        });
      }
    }
  },
  'tasks.edit'(newText, newTime, newPriority, schedule, auto,
    startDate, endDate, startTime, endTime, duration, rep, taskId) {
    const task = Tasks.findOne(taskId);
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    if (newText !== '') {
      if (!schedule) {
        Tasks.update(taskId, { $set: {
          text: newText,
          time: newTime,
          priority: newPriority,
          schedule,
          auto,
          startDate,
          endDate,
          startTime,
          endTime,
          duration,
          rep,
        } });
      } else if (schedule && !auto) {
        if (startDate !== undefined && endDate !== undefined &&
          startTime !== undefined && endTime !== undefined) {
          Tasks.update(taskId, { $set: {
            text: newText,
            time: newTime,
            priority: newPriority,
            schedule,
            auto,
            startDate,
            endDate,
            startTime,
            endTime,
            duration,
            rep,
          } });
        }
      } else if (schedule && auto) {
        Tasks.update(taskId, { $set: {
          text: newText,
          time: newTime,
          priority: newPriority,
          schedule,
          auto,
          startDate,
          endDate,
          startTime,
          endTime,
          duration,
          rep,
        } });
      }
    }
  },
  'tasks.remove'(taskId) {
    check(taskId, String);
    const task = Tasks.findOne(taskId);
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.remove(taskId);
  },
  'tasks.toggleCheck'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
    const task = Tasks.findOne(taskId);
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
});
