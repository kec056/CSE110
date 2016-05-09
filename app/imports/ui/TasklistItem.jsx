import React, { Component, PropTypes } from 'react';

export default class TasklistItem extends Component {
  render() {
    return (
      <li>{this.props.task.text}</li>
    );
  }
}

TasklistItem.propTypes = {
  task: PropTypes.object.isRequired,
};
