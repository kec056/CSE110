import React, { PropTypes } from 'react';
// material ui imports lol
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Tabs, Tab } from 'material-ui/Tabs';

import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/Tasks.js';
import TasklistItem from './TasklistItem.jsx';

// required for interacting/clicing on tabs

// dark theme for ui?
const darkMuiTheme = getMuiTheme(darkBaseTheme);
// font style for tabs
// Tasklist component - represents the whole app
export class Tasklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'left',
    };
  }

  renderTitle() {
    return (
      <div className="title">
        <header>
          <h1>Tasks</h1>
        </header>
      </div>
    );
  }

  renderTabs() {
    return (
      <div className="tabs">
        <Tabs
          value={this.state.mode}
          onChange={(mode) => { this.setState({ mode }); }
          }
        >

          <Tab label="Planned" value="left" />
          <Tab label="Completed" value="right" />
        </Tabs>
      </div>
    );
  }
  // render both completed and uncompleted tasks
  // currently not used
  renderTasks() {
    return this.props.tasks.map((task) =>
      <TasklistItem key={task._id} task={task} />
    );
  }
  // render only uncompleted task
  // currently used
  renderPlannedTasks() {
    let filteredPlannedTasks = this.props.tasks;

    filteredPlannedTasks = filteredPlannedTasks.filter(task => !task.checked);

    // if All tasks completed
    const taskCount = Tasks.find({ checked: { $ne: true } }).count();
    if (taskCount === 0) {
      return (
        <div><h2>All Done!!</h2></div>
        );
    }
    else {
      return filteredPlannedTasks.map((task) => (
        <TasklistItem key={task._id} task={task} />
      ));
    }
  }
  // render only completed tasks
  // used for completed tasks tab
  renderCompletedTasks() {
    let filteredCompletedTasks = this.props.tasks;

    filteredCompletedTasks = filteredCompletedTasks.filter(task => task.checked);

    return filteredCompletedTasks.map((task) => (
      <TasklistItem key={task._id} task={task} />
    ));
  }

  renderTasklistPlanned() {
    return (
      <div className="text">
          {(this.state.mode === 'left') ?
            <div className="tasklistbody">
              {this.renderPlannedTasks()}
            </div> : ''
          }
      </div>
    );
  }

  renderTasklistComplete() {
    return (
      <div className="text">
          {(this.state.mode === 'right') ?
            <div className="tasklistbody">
              {this.renderCompletedTasks()}
            </div> : ''
          }
      </div>
    );
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div className="container">

          {/* Render Planned Tasks */}
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            {this.renderTasklistPlanned()}
          </MuiThemeProvider>

          {/* Render Completed Tasks */}
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            {this.renderTasklistComplete()}
          </MuiThemeProvider>

          {/* Render Tabs */}
          {this.renderTabs()}

        </div>
      </MuiThemeProvider>
    );
  }
}

Tasklist.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { time: 1, priority: -1, createdAt: 1 } }).fetch(),
  };
}, Tasklist);
