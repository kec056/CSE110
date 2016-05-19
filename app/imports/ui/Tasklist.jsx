import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/Tasks.js';

import TasklistItem from './TasklistItem.jsx';

// Tasklist component - represents the whole app
export default class Tasklist extends Component {
  renderTasks() {
    return this.props.tasks.map(task =>
      <TasklistItem key={task._id} task={task} />
    );
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Tasks</h1>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
        
        <ul>
          <li>Task 1</li>
          <li>Task 2</li>
          <li>Task 3</li>  
        </ul>
      </div>
    );
  }
}

Tasklist.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}).fetch(),
  };
}, Tasklist);
