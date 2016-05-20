import React from 'react';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
const AddTaskButton = (conBu) => (
    <IconButton iconStyle={styles.icon} style={styles.frame}>
      <ContentAdd />
    </IconButton>
)

export default AddTaskButton;
