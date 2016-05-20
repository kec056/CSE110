import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

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
}
export default class AddTaskButton extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      addMenuOpen: false,
    };
  }

  //submit task
  handleSubmit(event) {
    const text = this.refs.textFieldValue.getValue();

    if (text != ''){
      Tasks.insert({
        text,
        createdAt: new Date(),
      });
    }
  }

  renderAddIcon(){
    return(
      <IconButton 
        iconStyle={styles.icon} 
        style={styles.frame}
        onFocus={()=>{this.setState({addMenuOpen:true});}}
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
            this.setState({addMenuOpen:false});
          }
        }
      />,
      <FlatButton
        label="Add"
        primary={true}
        
        onTouchTap={
          ()=>{
            this.setState({addMenuOpen:false});
            this.handleSubmit(this);
          }
        }
      />
    ];
    return(
      <Dialog
        actions={actionChoice}
        modal={true}
        open={this.state.addMenuOpen}
        
        onRequestClose={
          ()=>{
            this.setState({addMenuOpen:false});
          }
        }
      >
        <TextField 
          hintText="Enter a new Task"
          fullWidth={true}
          ref="textFieldValue"
        />
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

