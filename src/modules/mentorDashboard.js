import React, {useEffect} from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ForumIcon from '@material-ui/icons/Forum';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
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
    const url = `http://59.29.224.144:10000/users/${userData.id}`;
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

    const classes = useStyles();
    // console.log(props);
    // console.log(props.user)
    const uesrData = sessionStorage.getItem('user');

    return(
    // <div className={classes.root}>
    <List component="nav" subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Mentor DashBoard
        </ListSubheader>}
        className={classes.root}
     >

    <ListItem alignItems="center" style={{backgroundColor: 'gainsboro'}}>
    <ListItemAvatar>
        <Avatar />
    </ListItemAvatar>
    {/* <ListItemText primary= {`${user.mentorNickname}`}/> */}
    <ListItemText primary= "00님"/>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Mentees"/>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <ForumIcon />
      </ListItemIcon>
      <ListItemText primary="Code List" />
    </ListItem>


    <ListItem button>
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary="Metrics" />
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