import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/Tasks.js';

import TasklistItem from './TasklistItem.jsx';

// App component - represents the whole app
class App extends Component {
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
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}).fetch(),
  };
}, App);
