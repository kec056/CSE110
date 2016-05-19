import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
//material ui imports lol
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Tabs, Tab} from 'material-ui/Tabs';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/Tasks.js';
import TasklistItem from './TasklistItem.jsx';

//required for interacting/clicing on tabs
injectTapEventPlugin();

//dark theme for ui?
const darkMuiTheme = getMuiTheme(darkBaseTheme);
//font style for tabs
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight:400,
  },
}

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
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div className="container">

          <div className="title">
            <header>
              <h1>Tasks</h1>
            </header>
          </div>
          
          <Tabs>
            <Tab label="Planned">
              <div>
                <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                  <input
                    type="text"
                    ref="textInput"
                    placeholder="Enter a new task."
                  />
                </form> 
                  <h2 style={styles.headline}>
                    {this.renderTasks()}
                  </h2>
              </div>
            </Tab>
              <Tab label="Completed">
                <div>
                </div>
              </Tab>
          </Tabs>

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
    tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, Tasklist);
