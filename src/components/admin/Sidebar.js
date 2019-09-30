import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Typography } from '@material-ui/core';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import StyleRoundedIcon from '@material-ui/icons/StyleRounded';
import DirectionsCarRoundedIcon from '@material-ui/icons/DirectionsCarRounded';
import CommuteRoundedIcon from '@material-ui/icons/CommuteRounded';
import ActionsButton from './ActionsButton'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#363636',
    marginTop: 90,
  },
  whiteColor:{
    color: 'rgb(173, 173, 173) !important',
  }
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const obj = [
    {
        type: 'Users',
        link: '/users',
        component: <SupervisorAccountRoundedIcon className = {classes.whiteColor}/>
    },
    {
        type: 'Makes',
        link: '/makes',
        component: <StyleRoundedIcon className = {classes.whiteColor}/>
    },
    {
        type: 'Body Styles',
        link: '/bodystyles',
        component: <CommuteRoundedIcon className = {classes.whiteColor}/>
    },
    {
        type: 'Cars',
        link: '/cars',
        component: <DirectionsCarRoundedIcon className = {classes.whiteColor}/>
    },
    
  ]

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
            {obj.map(object => (
                <div key={object.type}>
                    <ListItem button>
                    <ListItemIcon>
                        {object.component}
                        </ListItemIcon>
                    <Typography className = {classes.whiteColor}>{object.type}</Typography>
                    <ActionsButton item={object.type} link={object.link}/>
                    </ListItem>
                    <Divider />
                </div>
            ))}
        </List>
      </Drawer>
    </div>
  );
}
