import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// Task component - represents a single todo item
export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editTask: false,
    };
  }

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  setEdit() {
    this.setState({
      editTask: true,
    });
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  editThisTask(event) {
    this.setState({
      editTask: false,
    });

    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.editInput).value.trim();

    Meteor.call('tasks.edit', this.props.task._id, text);

  }

  handleFocus() {
    this.refs.editInput.focus();
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';

    return (
      <li className={taskClassName}>
        { !this.state.editTask ?
          <button className="delete" onClick={this.deleteThisTask.bind(this)}>
            &times;
          </button> : ''
        }

        { !this.state.editTask ?
          <button className="edit" onClick={this.setEdit.bind(this)}>
            Edit
          </button> :

          <form className="text" onSubmit={this.editThisTask.bind(this)}>
            <input
              type="text"
              autoFocus
              ref="editInput"
              defaultValue={this.props.task.text}
              onfocus={this.handleFocus}
            />
          </form>
        }

        { !this.state.editTask ?
          <input
            type="checkbox"
            readOnly
            checked={this.props.task.checked}
            onClick={this.toggleChecked.bind(this)}
          /> : ''
        }

        { !this.state.editTask ?
          <span className="text">
            {this.props.task.text}
          </span> : ''
        }

      </li>
    );

  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};