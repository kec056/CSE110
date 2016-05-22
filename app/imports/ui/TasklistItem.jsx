import React, { Component, PropTypes } from 'react';
//material-ui ListItem import
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import ChevronRightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';

import { Tasks } from '../api/Tasks.js';


// define right icon menu
const iconButtonElement = (
<IconButton 
    touch={true}
>
    <MoreVertIcon color={grey400} />
</IconButton>
);

export default class TasklistItem extends Component {
 constructor(props){
    super(props);
    this.state ={
      slideIndex: 0,
    };
 }
  
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
    const rightIconMenu = (
      <IconMenu 
          iconButtonElement={iconButtonElement}
      >
      <MenuItem primaryText="Edit" />
      <MenuItem 
        primaryText="Delete" 
        onTouchTap={
            this.deleteThisTask.bind(this)
        }
      >
      </MenuItem>
      </IconMenu>
    );

    color = { fill: '#BDBDBD' };
    if(this.props.task.time == 2){
        color =  { fill: '#FDD835' };
    }
    else if( this.props.task.time == 3){
        color =  { fill: '#00BCD4' };
    }
    else if( this.props.task.time == 4){
        color =  { fill: '#512DA8' };
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
        >
        </ListItem>
      </Paper>
    );
  }
}

TasklistItem.propTypes = {
  task: PropTypes.object.isRequired,
};
