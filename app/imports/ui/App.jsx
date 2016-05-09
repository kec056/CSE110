import React, { Component } from 'react';

import Task from './Task.jsx';

// App component - represents the whole app
export default class App extends Component {
  renderTasks() {
    return (
      <li>Nothing here</li>
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
