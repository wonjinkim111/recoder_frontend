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
      maxWidth: 55,
      //backgroundColor: theme.palette.background.paper,
      backgroundColor : '#26004d'
    },
  }));

export default function MentorDashBoard(props){
  const [user, setUser] = React.useState([]);

  // useEffect(() => {
  //   const userData = JSON.parse(sessionStorage.getItem('user'));
  //   const url = `http://192.168.1.2045.207:10000/users/${userData.id}`;
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
  const userDataRaw = sessionStorage.getItem('user');
  if (!userDataRaw) {
    console.error("❌ sessionStorage에 user 항목이 없습니다.");
    return;
  }
  const userData = JSON.parse(userDataRaw);
  if (!userData.id) {
    console.error("❌ userData.id 값이 없습니다. 로그인부터 확인하세요.");
    return;
  }
  console.log("✅ userData", userData);

  const url = `http://192.168.1.20:32513/users/${userData.id}`;
  axios.get(url)
    .then(response => {
      console.log("✅ API 응답:", response.data);
      setUser(response.data);
    })
    .catch(error => {
      console.error("❌ 유저 정보 불러오기 실패:", error);
    });
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
    <List component="nav" style={{border:"1 solid black"}} 
        className={classes.root}
     >

    <ListItem button onClick={roomlistClick}>
      <ListItemIcon>
        <AccountBalanceIcon style={{color:'white'}} />
      </ListItemIcon>
    </ListItem>

    <ListItem button onClick={participatingClick}>
      <ListItemIcon>
        <RecentActorsIcon  style={{color:'white'}}/>
      </ListItemIcon>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <ThumbUpAltIcon  style={{color:'white'}}/>
      </ListItemIcon>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <SettingsIcon  style={{color:'white'}}/>
      </ListItemIcon>
    </ListItem>
  </List>
    )
}