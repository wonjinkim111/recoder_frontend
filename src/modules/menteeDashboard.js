import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 200,
      backgroundColor: theme.palette.background.paper,
    },
  }));

export default function MentorDashBoard(props){
    const classes = useStyles();
    // console.log(props);
    // console.log(props.user)
    
    return(
    // <div className={classes.root}>
    <List component="nav" subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Mentee DashBoard
        </ListSubheader>}
        className={classes.root}
     >

    <ListItem alignItems="center" style={{backgroundColor: 'gainsboro'}}>
    <ListItemAvatar>
        <Avatar />
    </ListItemAvatar>
    {/* <ListItemText primary={`${props.user.name} 님`}/> */}
    <ListItemText primary='000님'/>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <RecentActorsIcon />
      </ListItemIcon>
      <ListItemText primary="Participating"/>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <ThumbUpAltIcon />
      </ListItemIcon>
      <ListItemText primary="Reviews" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
  </List>
//   </div>
    )
}