import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Slider from './Slider'

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

function FullScreenDialog(props) {

  return (
    <Dialog fullScreen open={props.open} onClose={props.change} TransitionComponent={Transition}>
      <Toolbar>
        <IconButton color="inherit" onClick={props.change} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <List>
        <ListItem button>
          <Slider/>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Default notification ringtone" secondary="Tethys" />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default FullScreenDialog;