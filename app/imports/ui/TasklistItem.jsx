import React, { Component, PropTypes } from 'react';
// material-ui ListItem import
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Paper from 'material-ui/Paper';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import { grey100, grey300, grey400, darkBlack, amber400, cyan500, deepPurple700 }
  from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme = getMuiTheme({
  palette: {
    disabledColor: darkBlack,
  },
});

// tasklist background color
// light grey for completed task in task view
const checked = getMuiTheme({
  palette: {
    canvasColor: grey100,
  },
});

const styles = {
  menuWidth: {
    width: 'calc(100% - 12px)',
    marginLeft: 7,
  },
  checkbox: {
    marginTop: 15,
    marginBottom: 3,
    marginRight: 0,
    marginLeft: 7,
  },
};

// define right icon menu
const iconButtonElement = (
  <IconButton
    touch={true}
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

export default class TasklistItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      editPrompt: false,
      scheduleTask: false,
      autoSchedule: false,
      timeMenu: 1,
      priorityMenu: 1,
      duration: 15,
      rep: 1,
    };
  }

  toggleChecked() {
    const taskId = this.props.task._id;
    const setChecked = !this.props.task.checked;
    Meteor.call('tasks.toggleCheck', taskId, setChecked);
  }

  deleteThisTask() {
    const taskId = this.props.task._id;
    Meteor.call('tasks.remove', taskId);
  }

  handleEdit() {
    const taskId = this.props.task._id;
    const newText = this.refs.textFieldValue.getValue();
    const newTime = this.state.timeMenu;
    const newPriority = this.state.priorityMenu;

    let auto = this.state.autoSchedule;
    let schedule = this.state.scheduleTask;
    const duration = this.state.duration;
    const rep = this.state.rep;
    let startDate = null;
    let endDate = null;
    let startTime = null;
    let endTime = null;
    let closePrompt = false;

    if (newText !== '') {
      if (!this.state.scheduleTask) {
        closePrompt = true;
        auto = this.state.autoSchedule;
        schedule = this.state.scheduleTask;
      } else if (this.state.scheduleTask && !this.state.autoSchedule) {
        auto = this.state.autoSchedule;
        startDate = this.refs.startdate.state.date;
        endDate = this.refs.enddate.state.date;
        startTime = this.refs.starttime.state.time;
        endTime = this.refs.endtime.state.time;

        if (startTime === undefined && endTime === undefined) {
          startTime = this.refs.starttime.props.defaultTime;
          endTime = this.refs.endtime.props.defaultTime;
        }

        if (startDate !== undefined && endDate !== undefined &&
          startTime !== undefined && endTime !== undefined) {
          closePrompt = true;
          auto = this.state.autoSchedule;
          schedule = this.state.scheduleTask;
        }
      } else if (this.state.scheduleTask && this.state.autoSchedule) {
        closePrompt = true;
        auto = this.state.autoSchedule;
        schedule = this.state.scheduleTask;
      }
    }
    if (closePrompt) {
      this.setState({ editPrompt: false });
      Meteor.call('tasks.edit', newText, newTime, newPriority, schedule, auto,
        startDate, endDate, startTime, endTime, duration, rep, taskId);
    }
  }
  renderEditNonScheduled() {
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
  renderEditScheduleNew() {
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
  renderEditScheduleExisting() {
    return (
      <MuiThemeProvider
        muiTheme={(this.props.task.startTime === undefined) ?
          getMuiTheme() :
          theme
        }
      >
        <div className="datePicker">
          <div>
            <div className="floatLeft">
              <DatePicker
                hintText="Start Date"
                ref="startdate"
                defaultDate={this.props.task.startDate}
                textFieldStyle={{ width: '100%' }}
                style={styles.menuWidth}
              />
            </div>
            <div className="floatRight">
              <DatePicker
                hintText="End Date"
                ref="enddate"
                defaultDate={this.props.task.endDate}
                textFieldStyle={{ width: '100%' }}
                style={styles.menuWidth}
              />
            </div>
          </div>

          <div>
            <div className="floatLeft">
              <TimePicker
                hintText={(this.props.task.startTime === undefined) ?
                  'Start Time' :
                  this.props.task.startTime.toLocaleTimeString()
                }
                ref="starttime"
                defaultTime={(this.props.task.startTime === undefined) ?
                  {} :
                  this.props.task.startTime
                }
                textFieldStyle={{ width: '100%' }}
                style={styles.menuWidth}
              />
            </div>
            <div className="floatRight">
              <TimePicker
                hintText={(this.props.task.endTime === undefined) ?
                  'End Time' :
                  this.props.task.endTime.toLocaleTimeString()
                }
                ref="endtime"
                defaultTime={(this.props.task.endTime === undefined) ?
                  {} :
                  this.props.task.endTime
                }
                textFieldStyle={{ width: '100%' }}
                style={styles.menuWidth}
              />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
  renderEditNonAuto() {
    return (
      <div>
        {(this.props.task.startTime === null) ?
          <div>{this.renderEditScheduleNew()} </div>
          :
          <div>{this.renderEditScheduleExisting()}</div>
        }
      </div>
    );
  }
  renderEditAuto() {
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
  renderEditScheduled() {
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
            {this.renderEditNonAuto()}
          </div> :
          <div>
            {this.renderEditAuto()}
          </div>
        }
      </div>
    );
  }

  renderEditPrompt() {
    const actionChoice = [
      <FlatButton
        label="Cancel"
        primary={true}

        onTouchTap={
          () => {
            this.setState({
              editPrompt: false,
            });
          }
        }
      />,
      <FlatButton
        label="Edit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={
          () => {
            this.handleEdit(this);
          }
        }
      />,
    ];
    return (
      <Dialog
        title="Edit Task"
        actions={actionChoice}
        modal={true}
        open={this.state.editPrompt}
        repositionOnUpdate={false}
        onRequestClose={
          () => {
            this.setState({
              editPrompt: false,
            });
          }
        }
      >
        <TextField
          id="edit-task-prompt"
          defaultValue={this.props.task.text}
          fullWidth={true}
          ref="textFieldValue"
          style={styles.menuWidth}
          onKeyDown={
            (e) => {
              if (e.key === 'Enter') {
                this.handleEdit(this);
              }
            }
          }
        />
        {(!this.state.scheduleTask) ?
          <div>
            {this.renderEditNonScheduled()}
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
            {this.renderEditScheduled()}
          </div> : ''
        }
      </Dialog>
    );
  }
  renderListItem() {
    const checkStyle = this.props.task.checked ? 'crossOut' : 'taskItem';
    const rightIconMenu = (
      <IconMenu
        iconButtonElement={iconButtonElement}
      >
        <MenuItem
          primaryText="Edit"
          onTouchTap={() => {
            this.setState({
              editPrompt: true,
              timeMenu: this.props.task.time,
              priorityMenu: this.props.task.priority,
              autoSchedule: this.props.task.auto,
              scheduleTask: this.props.task.schedule,
            });
          }}
        />
        <MenuItem
          primaryText="Delete"
          onTouchTap={
            this.deleteThisTask.bind(this)
          }
        />
      </IconMenu>
    );

    // set checkbox color
    let color = { fill: grey400 };
    // grey out checkbox for completed list
    if (this.props.task.checked && this.props.tab === 'left') {
      color = { fill: grey300 };

    // regular color (yellow/blue/purple)
    } else if (!this.props.task.schedule) {
      if (this.props.task.time === 1) {
        color = { fill: amber400 };
      } else if (this.props.task.time === 2) {
        color = { fill: cyan500 };
      } else if (this.props.task.time === 3) {
        color = { fill: deepPurple700 };
      }
    }

    // set completed task background to be greyed out
    let paperColor = getMuiTheme();
    if (this.props.task.checked && this.props.tab === 'left') {
      paperColor = checked;
    }

    return (
      <MuiThemeProvider
        muiTheme={paperColor}
      >
        <Paper>
          <ListItem
            primaryText={<p
              className={(this.props.tab === 'left') ? checkStyle : 'taskItem'}
            >{this.props.task.text}</p>}
            leftIcon={
              <Checkbox
                checked={this.props.task.checked}
                onCheck={this.toggleChecked.bind(this)}
                iconStyle={color}
              />}
            rightIconButton={rightIconMenu}
          />
        </Paper>
      </MuiThemeProvider>
    );
  }

  render() {
    return (
      <div>
        {this.renderListItem()}
        {this.renderEditPrompt()}
      </div>
    );
  }
}

TasklistItem.propTypes = {
  task: PropTypes.object.isRequired,
  tab: PropTypes.object,
};
