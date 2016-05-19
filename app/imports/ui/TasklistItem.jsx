import React, { Component, PropTypes } from 'react';
//material-ui ListItem import
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400} from 'material-ui/styles/colors';

import { Tasks } from '../api/Tasks.js';

//define right icon button
const iconButtonElement = (
	<IconButton touch={true}>
		<MoreVertIcon color={grey400} />
	</IconButton>
);

// define right icon menu
const rightIconMenu = (
	<IconMenu 
		iconButtonElement={iconButtonElement}>

		// add redirect to edit screen
		<MenuItem >Edit </MenuItem>
		// add popup to confirm deletion
		<MenuItem >Delete</MenuItem>
	</IconMenu>
);

export default class TasklistItem extends Component {
  toggleChecked(){
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  deleteThisTask(){
    Tasks.remove(this.props.task._id);
  }

  render() {
    const taskClassName = this.props.task.checked ? 'checked' : '';
    return (
	  <ListItem 
	  	secondaryText={this.props.task.text}
		leftCheckbox={
			<Checkbox 
				onCheck={this.props.task.checked}
				iconStyle={{ fill: '#00BCD4' }}
			/>}
		rightIconButton={rightIconMenu}
		
		// set "style" field for priority?

		/*
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>
        <input
          type="checkbox"
          readOnly
          checked={this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />
        <span className="text">{this.props.task.text}</span>
      </li>
	  	*/
	  />
    );
  }
}

TasklistItem.propTypes = {
  task: PropTypes.object.isRequired,
};
