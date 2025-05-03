import React, {useEffect} from 'react';
//import { Link, BrowserRouter as Router } from "react-router-dom"
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
import Link from '@material-ui/core/Link';
import { withRouter, Link as RouterLink } from 'react-router-dom';
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
  const [roomid, setRoomid] = React.useState();

  // useEffect(() => {
  //   //console.log(props)
  //   const getUrl = document.location.href.split("/");
  //   //console.log(getUrl);
  //   const len = getUrl.length;
  //   setRoomid(getUrl[len-1]);
  //   //const roomId = getUrl[1].split("=");

  //   const userData = JSON.parse(sessionStorage.getItem('user'));
  //   console.log(user);
  //   const url = `http://recoder.com:31413/users/${userData.Id}`;
  //   axios.get(url)
  //   .then(response =>{
  //     console.log(response);
  //     setUser(response.data)
  //   }) 
  //     .catch(error => {
  //       // alert("error")
  //       console.log(error);
  //     })


  // }, []);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
  
    if (userData && userData.mentorId) {
      const url = `http://recoder.com:31413/room/mentor/${userData.mentorId}`;
      axios.get(url)
        .then(res => {
          console.log("Room list fetched:", res.data);
          // 첫 번째 room id를 기본값으로 사용
          if (res.data.length > 0) {
            setRoomid(res.data[0].roomId);  // 이 부분 중요
          }
        })
        .catch(err => {
          console.error("Room list fetch error:", err);
        });
    } else {
      console.error("mentorId is missing in sessionStorage");
    }
  }, []);

  const menteelistClick = () => {
    window.location.href=`/mentordashboard/${roomid}`;
  }
  const codelistClick = () => {
    window.location.href=`/mentordashboard/reviewlist/${roomid}`;
  }
  const settingClick = () => {
    window.location.href=`/mentordashboard/setting/${roomid}`;
  }

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
    <ListItemText primary= {`${user.mentorNickname}`}/>
    {/* <ListItemText primary= "00님"/> */}
    </ListItem>

    <ListItem button onClick={menteelistClick}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Mentees"/>
    </ListItem>

    <ListItem button onClick={codelistClick}>
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
    
    <ListItem button onClick={settingClick}>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
  </List>
//   </div>
    )
}