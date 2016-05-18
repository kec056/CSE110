import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/Tasks.js';

import TasklistItem from './TasklistItem.jsx';

// Tasklist component - represents the whole app
export default class Tasklist extends Component {
  handleSubmit(event) {
    event.preventDefault();
    
    //find the text field using react ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    //if not entering an empty task, add to Task collections
    if (text != ''){
      Tasks.insert({
        text,
        createdAt: new Date(),
      });
    }
    //clears form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  renderTasks() {
    return this.props.tasks.map(task =>
      <TasklistItem key={task._id} task={task} />
    );
  }

  render() {
    return (
      <div className="container">
        <div className="title">
          <header>
            <h1>Tasks</h1>
          </header>
        </div>
        <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
          <input
              type="text"
              ref="textInput"
              placeholder="Enter a new task."
          />
        </form> 
        <ul>
          {this.renderTasks()}
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
    tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, Tasklist);
