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
import TimePicker from 'material-ui/TimePicker';

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
      autoSchedule: false,
      timeMenu: 1,
      priorityMenu: 1,
      duration: 15,
      rep: 1,
    };
  }

  // submit task
  handleSubmit() {
    const text = this.refs.textFieldValue.getValue();
    const time = this.state.timeMenu;
    const priority = this.state.priorityMenu;
    const checked = false;

    const schedule = this.state.scheduleTask;
    const auto = this.state.autoSchedule;
    const duration = this.state.duration;
    const rep = this.state.rep;
    let startDate = null;
    let endDate = null;
    let startTime = null;
    let endTime = null;
    let closePrompt = false;

    if (text !== '') {
      if (!schedule) {
        closePrompt = true;
      } else if (schedule && !auto) {
        startDate = this.refs.startdate.state.date;
        endDate = this.refs.enddate.state.date;
        startTime = this.refs.starttime.state.time;
        endTime = this.refs.endtime.state.time;
        startTime.setSeconds(0);
        endTime.setSeconds(0);
        if (startDate !== undefined && endDate !== undefined &&
          startTime !== undefined && endTime !== undefined) {
          closePrompt = true;
        }
      } else if (schedule && auto) {
        closePrompt = true;
      }
    }
    if (closePrompt) {
      this.setState({ newTaskPrompt: false });
    }
    Meteor.call('tasks.insert', text, time, priority, checked, schedule, auto,
    startDate, endDate, startTime, endTime, duration, rep);
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
              autoSchedule: false,
              timeMenu: 1,
              priorityMenu: 1,
              duration: 15,
              rep: 1,
            });
          }
        }
      >
        <ContentAdd />
      </IconButton>
    );
  }

  renderSelectionFields() {
    return (
      <div>
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
      </div>
    );
  }
  renderDatePicker() {
    return (
      <div className="datePicker">
        <div>
          <div className="floatLeft">
            <DatePicker
              hintText="Start Date"
              ref="startdate"
              disabled={!this.state.scheduleTask}
              textFieldStyle={{ width: '100%' }}
              style={styles.menuWidth}
            />
          </div>
          <div className="floatRight">
            <DatePicker
              hintText="End Date"
              ref="enddate"
              disabled={!this.state.scheduleTask}
              textFieldStyle={{ width: '100%' }}
              style={styles.menuWidth}
            />
          </div>
        </div>

        <div>
          <div className="floatLeft">
            <TimePicker
              hintText="Start time"
              ref="starttime"
              disabled={!this.state.scheduleTask}
              textFieldStyle={{ width: '100%' }}
              style={styles.menuWidth}
            />
          </div>
          <div className="floatRight">
            <TimePicker
              hintText="End time"
              ref="endtime"
              disabled={!this.state.scheduleTask}
              textFieldStyle={{ width: '100%' }}
              style={styles.menuWidth}
            />
          </div>
        </div>
      </div>
    );
  }
  renderAutoSchedule() {
    return (
      <div>
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
          value={this.state.duration}
          onChange={(event, index, value) => { this.setState({ duration: value }); }}
          autoWidth={true}
          style={styles.menuWidth}
        >
          <MenuItem value={15} primaryText="15 Minutes" />
          <MenuItem value={30} primaryText="30 Minutes" />
          <MenuItem value={45} primaryText="45 Minutes" />
          <MenuItem value={60} primaryText="1 Hour" />
          <MenuItem value={120} primaryText="2 Hours" />
          <MenuItem value={180} primaryText="3 Hours" />
          <MenuItem value={240} primaryText="4 Hours" />
        </SelectField>

        <SelectField
          value={this.state.rep}
          onChange={(event, index, value) => { this.setState({ rep: value }); }}
          autoWidth={true}
          style={styles.menuWidth}
        >
          <MenuItem value={1} primaryText="Once a Week" />
          <MenuItem value={2} primaryText="Twice a Week" />
          <MenuItem value={3} primaryText="3 Times a Week" />
          <MenuItem value={5} primaryText="5 Times a Week" />
          <MenuItem value={7} primaryText="Everyday" />
        </SelectField>
      </div>
    );
  }
  renderSchedulingFields() {
    return (
      <div>
        <Checkbox
          label="Schedule For Me"
          labelPosition="left"
          style={styles.checkbox}
          checked={this.state.autoSchedule}
          onCheck={
            () => {
              this.setState({
                autoSchedule: !this.state.autoSchedule,
                timeMenu: 1,
                duration: 15,
                rep: 1,
              });
            }
          }
        />
        {(!this.state.autoSchedule) ?
          <div>
            {this.renderDatePicker()}
          </div> :
          <div>
            {this.renderAutoSchedule()}
          </div>
        }
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
        contentStyle={{ top: '-40px' }}
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
        {(!this.state.scheduleTask) ?
          <div>
            {this.renderSelectionFields()}
          </div> : ''
        }

        <Checkbox
          label="Schedule this Task"
          labelPosition="left"
          style={styles.checkbox}
          checked={this.state.scheduleTask}
          onCheck={
            () => {
              this.setState({
                scheduleTask: !this.state.scheduleTask,
                autoSchedule: false,
              });
            }
          }
        />

        {(this.state.scheduleTask) ?
          <div>
            {this.renderSchedulingFields()}
          </div> : ''
        }

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

