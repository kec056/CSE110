import React from 'react';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';

import { Tasks } from '../api/Tasks.js';
const styles = {
  icon: {
    width: 27,
    height: 27,
    fill: 'white',
  },
  frame: {
    width: 49,
    height: 49,
    padding: 0,
  },
  menuWidth: {
    width: 'calc(100% - 12px)',
    marginLeft: 7,
  },
  block: {
    width: '100%',
  },
  checkbox: {
    marginTop: 15,
    marginBottom: 3,
    marginRight: 0,
    marginLeft: 7,
  },
};

export default class AddTaskButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskPrompt: false,
      scheduleTask: false,
      timeMenu: 1,
      priorityMenu: 1,
    };
  }

  // submit task
  handleSubmit() {
    const text = this.refs.textFieldValue.getValue();
    const time = this.state.timeMenu;
    const priority = this.state.priorityMenu;
    const checked = false;
    const schedule = this.state.scheduleTask;
    let startDate = '';
    let endDate = '';

    if (text !== '') {
      if (!schedule) {
        this.setState({ newTaskPrompt: false });
        Tasks.insert({
          text,
          time,
          checked,
          priority,
          schedule,
          createdAt: new Date(),
        });
      }
      else if (schedule) {
        startDate = this.refs.start.state.date;
        endDate = this.refs.end.state.date;
        console.log(endDate);
        console.log(startDate);

        if (startDate !== undefined && endDate !== undefined) {
          this.setState({ newTaskPrompt: false });

          Tasks.insert({
            text,
            time,
            checked,
            priority,
            schedule,
            startDate,
            endDate,
            createdAt: new Date(),
          });
        }
      }
    }
  }

  renderAddIcon() {
    return (
      <IconButton
        iconStyle={styles.icon}
        style={styles.frame}
        onFocus={
          () => {
            this.setState({
              newTaskPrompt: true,
              scheduleTask: false,
              timeMenu: 1,
              priorityMenu: 1,
            });
          }
        }
      >
        <ContentAdd />
      </IconButton>
    );
  }
  renderDatePicker() {
    return (
      <div>
        <DatePicker
          hintText="Start Date"
          ref="start"
          disabled={!this.state.scheduleTask}
          textFieldStyle={{ width: '100%' }}
          style={styles.menuWidth}
        />
        <DatePicker
          hintText="End Date"
          ref="end"
          disabled={!this.state.scheduleTask}
          textFieldStyle={{ width: '100%' }}
          style={styles.menuWidth}
        />
      </div>
    );
  }

  renderAddPrompt() {
    const actionChoice = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={
          () => {
            this.setState({ newTaskPrompt: false });
          }
        }
      />,
      <FlatButton
        label="Add"
        primary={true}
        keyboardFocused={true}
        onTouchTap={
          () => {
            this.handleSubmit(this);
          }
        }
      />,
    ];
    return (
      <Dialog
        title="New Task"
        actions={actionChoice}
        modal={true}
        open={this.state.newTaskPrompt}
        repositionOnUpdate={false}
        contentStyle={{ top: '-50px' }}
        onRequestClose={
          () => {
            this.setState({ newTaskPrompt: false });
          }
        }
      >
        <TextField
          hintText="Title"
          fullWidth={true}
          ref="textFieldValue"
          style={styles.menuWidth}
          onKeyDown={
            (e) => {
              if (e.key === 'Enter') {
                this.handleSubmit(this);
              }
            }
          }
        />
        <SelectField
          value={this.state.timeMenu}
          onChange={(event, index, value) => { this.setState({ timeMenu: value }); }}
          autoWidth={true}
          style={styles.menuWidth}
        >
          <MenuItem value={1} primaryText="Morning" />
          <MenuItem value={2} primaryText="Afternoon" />
          <MenuItem value={3} primaryText="Evening" />
        </SelectField>

        <SelectField
          value={this.state.priorityMenu}
          onChange={(event, index, value) => { this.setState({ priorityMenu: value }); }}
          autoWidth={true}
          style={styles.menuWidth}
        >
          <MenuItem value={1} primaryText="Low Priority" />
          <MenuItem value={2} primaryText="Medium Priority" />
          <MenuItem value={3} primaryText="High Priority" />
        </SelectField>

        <div className="scheduleTaskCheck">
          <Checkbox
            label="Schedule this Task"
            labelPosition="left"
            style={styles.checkbox}
            checked={this.state.scheduleTask}
            onCheck={
              () => {
                this.setState({ scheduleTask: !this.state.scheduleTask });
              }
            }
          />

          {(this.state.scheduleTask === true) ?
            <div>
              {this.renderDatePicker()}
            </div> : ''
          }

        </div>
      </Dialog>
    );
  }

  render() {
    return (
      <div>
        {this.renderAddIcon()}
        {this.renderAddPrompt()}
      </div>
    );
  }
}

