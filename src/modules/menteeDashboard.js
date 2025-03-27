import React, {useEffect} from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import SettingsIcon from '@material-ui/icons/Settings';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 200,
      backgroundColor: theme.palette.background.paper,
    },
  }));

export default function MentorDashBoard(props){
  const [user, setUser] = React.useState([]);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const url = `http://192.168.45.216:32513/users/${userData.id}`;
    axios.get(url)
    .then(response =>{
      console.log(response);
      setUser(response.data)
    }) 
      .catch(error => {
        // alert("error")
        console.log(error);
      })


  }, []);

  const roomlistClick = () => {
    window.location.href='/menteedashboard/roomlist';
  }
  const participatingClick = () => {
    window.location.href='/menteedashboard/reviewlist';
  }

    const classes = useStyles();
    // console.log(props);
    // console.log(props.user)
    
    return(
    // <div className={classes.root}>
    <List component="nav" style={{border:"1 solid black"}} subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Mentee DashBoard
        </ListSubheader>}
        className={classes.root}
     >

    <ListItem alignItems="center" style={{backgroundColor: 'gainsboro'}}>
    <ListItemAvatar>
        <Avatar />
    </ListItemAvatar>
    <ListItemText primary={`${user.menteeNickname} 님`}/>
    {/* <ListItemText primary='000님'/> */}
    </ListItem>

    <ListItem button onClick={roomlistClick}>
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Room List" />
    </ListItem>

    <ListItem button onClick={participatingClick}>
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
    )
}