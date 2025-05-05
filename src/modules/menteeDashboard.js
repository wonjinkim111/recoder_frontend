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

  export default function MentorDashBoard(){
    const [roomId, setRoomId] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState({});
  
    useEffect(() => {
      const rawUser = sessionStorage.getItem("user");
      if (!rawUser) return;
  
      const userData = JSON.parse(rawUser);
      setUser(userData);
  
      if (!userData.mentorId) {
        console.error("mentorId가 없습니다.");
        return;
      }
  
      axios.get(`http://recoder.com:31413/room/mentor/${userData.mentorId}`)
        .then(res => {
          if (res.data.length > 0) {
            setRoomId(res.data[0].roomId);
          }
        })
        .catch(err => {
          console.error("room list 에러:", err);
        })
        .finally(() => setLoading(false));
    }, []);
  
    const handleNavigation = (path) => {
      if (!roomId) return alert("roomId가 아직 설정되지 않았습니다.");
      window.location.href = `${path}/${roomId}`;
    };
  
    if (loading) return <div>로딩 중...</div>;
  
    return (
      <List>
        <ListItem>
          <ListItemAvatar><Avatar /></ListItemAvatar>
          <ListItemText primary={`${user.mentorNickname || "멘토님"}`} />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/mentordashboard")}>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Mentees" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/mentordashboard/reviewlist")}>
          <ListItemIcon><ForumIcon /></ListItemIcon>
          <ListItemText primary="Code List" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/mentordashboard/setting")}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    );
  }