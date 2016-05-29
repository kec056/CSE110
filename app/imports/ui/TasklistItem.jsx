import React, { Component, PropTypes } from 'react';
// material-ui ListItem import
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey400 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

import { Tasks } from '../api/Tasks.js';

const styles = {
  dropMenu: {
    width: '100%',
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
      timeMenu: 1,
      priorityMenu: 1,
    };
  }

  toggleChecked() {
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  handleEdit() {
    const newText = this.refs.textFieldValue.getValue();
    const newTime = this.state.timeMenu;
    const newPriority = this.state.priorityMenu;
    const checked = false;

    if (newText !== '') {
      this.setState({ editPrompt: false });
      Tasks.update(this.props.task._id, { $set: {
        text: newText,
        time: newTime,
        priority: newPriority,
      } });
    }
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
            this.setState({ editPrompt: false });
          }
        }
      >
        <TextField 
          id="edit-task-prompt"
          defaultValue={this.props.task.text}
          fullWidth={true}
          ref="textFieldValue"
          onKeyDown={
            (e) => {
              if (e.key === 'Enter') {
                this.handleEdit(this);
              }
            }
          }
        />
        <SelectField
          value={this.state.timeMenu}
          onChange={(event, index, value) => { this.setState({ timeMenu: value }); }}
          autoWidth={true}
          style={styles.dropMenu}
        >
          <MenuItem value={1} primaryText="Morning" />
          <MenuItem value={2} primaryText="Afternoon" />
          <MenuItem value={3} primaryText="Evening" />
        </SelectField>

        <SelectField
          value={this.state.priorityMenu}
          onChange={(event, index, value) => { this.setState({ priorityMenu: value }); }}
          autoWidth={true}
          style={styles.dropMenu}
        >
          <MenuItem value={1} primaryText="Low Priority" />
          <MenuItem value={2} primaryText="Medium Priority" />
          <MenuItem value={3} primaryText="High Priority" />
        </SelectField>
      </Dialog>
    );
  }
  renderListItem() {
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

    let color = { fill: '#BDBDBD' };
    if (this.props.task.time === 1) {
      color = { fill: '#FDD835' };
    } else if (this.props.task.time === 2) {
      color = { fill: '#00BCD4' };
    } else if (this.props.task.time === 3) {
      color = { fill: '#512DA8' };
    }

    return (
      <Paper>
        <ListItem
          primaryText={<p className="taskItem">{this.props.task.text}</p>}
          leftIcon={
            <Checkbox
              checked={this.props.task.checked}
              onCheck={this.toggleChecked.bind(this)}
              iconStyle={color}
            />}
          rightIconButton={rightIconMenu}
        />
      </Paper>
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
};
