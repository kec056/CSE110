import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { Tasks } from '../api/Tasks.js';
const styles = {
  icon:{
    width:37,
    height: 37,
  },
  frame:{
    width: 51,
    height: 51,
    padding: 0,
  },
  dropMenu:{
    width: '100%',
  }
}

export default class AddTaskButton extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      newTaskPrompt: false,
      timeMenu: 1,
      priorityMenu: 1,
    };
  }

  //submit task
  handleSubmit(event) {
    const text = this.refs.textFieldValue.getValue();
    const time = this.state.timeMenu;
    const priority = this.state.priorityMenu;
	const checked = false;

    if (text != ''){
      Tasks.insert({
        text,
        time,
		checked,
        priority,
        createdAt: new Date(),
      });
      this.setState({newTaskPrompt:false});
    }
  }

  renderAddIcon(){
    return(
      <IconButton 
        iconStyle={styles.icon} 
        style={styles.frame}
        onFocus={
          ()=>{
            this.setState({
              newTaskPrompt:true, 
              timeMenu: 1, 
              priorityMenu: 1
            });
          }
        }
      >
        <ContentAdd />
      </IconButton>
    )
  }

  renderAddPrompt(){
    const actionChoice = [
      <FlatButton
        label="Cancel"
        primary={true}
        
        onTouchTap={
          ()=>{
            this.setState({newTaskPrompt:false});
          }
        }
      />,
      <FlatButton
        label="Add"
        primary={true}
        keyboardFocused={true}   
        onTouchTap={
          ()=>{
            this.handleSubmit(this);
          }
        }
      />
    ];
    return(
      <Dialog
        title="New Task"
        actions={actionChoice}
        modal={true}
        open={this.state.newTaskPrompt}
        repositionOnUpdate={false}
        onRequestClose={
          ()=>{
            this.setState({newTaskPrompt:false});
          }
        }
      >
        <TextField 
          hintText="Title"
          fullWidth={true}
          ref="textFieldValue"
        />
        <SelectField
          value={this.state.timeMenu}
          onChange={(event, index, value)=>{this.setState({timeMenu: value});}}
          autoWidth={true}
          style={styles.dropMenu}
        >
          <MenuItem value={1} primaryText="Default Time" />
          <MenuItem value={2} primaryText="Morning" />
          <MenuItem value={3} primaryText="Afternoon"/>
          <MenuItem value={4} primaryText="Evening" />
          <MenuItem value={5} primaryText="Night" />
        </SelectField>

        <SelectField
          value={this.state.priorityMenu}
          onChange={(event, index, value)=>{this.setState({priorityMenu: value});}}
          autoWidth={true}
          style={styles.dropMenu}
        >
          <MenuItem value={1} primaryText="Default Priority" />
          <MenuItem value={2} primaryText="Low Priority" />
          <MenuItem value={3} primaryText="Medium Priority" />
          <MenuItem value={4} primaryText="High Priority" />
        </SelectField>
      </Dialog>
    )
  }

  render(){
    return(
      <div>
        {this.renderAddIcon()}
        {this.renderAddPrompt()}
      </div>
    )
  }
}

