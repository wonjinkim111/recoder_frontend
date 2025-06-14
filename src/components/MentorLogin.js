import React from 'react';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    hidden: {
    display: 'none'
    }
}));

export default function MentorLogin(props){
    const [open, setOpen] = React.useState(false);
    const [mentor, setMentor] = React.useState({ mentorNickname: '', introduction: '' });
  
    const clickOpen = () => setOpen(true);
    const clickClose = () => setOpen(false);
  
    const handleChangeForm = e => {
      setMentor({ ...mentor, [e.target.name]: e.target.value });
    };
  
    const formSubmit = e => {
      e.preventDefault();
      if (!mentor.mentorNickname || !mentor.introduction) return;
  
      const rawUser = sessionStorage.getItem("user");
      if (!rawUser) return alert("로그인이 필요합니다.");
  
      const userData = JSON.parse(rawUser);
      if (!userData.id) return alert("user id가 없습니다.");
  
      axios.post(`http://192.168.1.10:10000/users/mentor/${userData.id}`, {
        mentorNickname: mentor.mentorNickname,
        introduction: mentor.introduction
      }).then(response => {
        sessionStorage.setItem("state", JSON.stringify("mentor"));
        sessionStorage.setItem("user", JSON.stringify({
          id: userData.id,
          token: userData.token,
          mentorId: response.data.mentorId,   // 
          menteeId: userData.menteeId    
        }));
        props.history.push("/mentor/roomlist");
      }).catch(() => {
        alert("멘토 등록 중 오류가 발생했습니다.");
      });
  
      setOpen(false);
      setMentor({ mentorNickname: '', introduction: '' });
    };
  
    return (
      <Container>
        <Typography>
          <Button onClick={clickOpen}>멘토생성하려면 클릭!</Button>
          <Dialog open={open} onClose={clickClose}>
            <DialogTitle>멘토 추가</DialogTitle>
            <DialogContent>
              <TextField label="닉네임" name="mentorNickname" fullWidth value={mentor.mentorNickname} onChange={handleChangeForm} />
              <TextField label="멘토 정보" name="introduction" multiline rows={3} fullWidth value={mentor.introduction} onChange={handleChangeForm} />
            </DialogContent>
            <DialogActions>
              <Button onClick={formSubmit}>추가</Button>
              <Button onClick={clickClose}>닫기</Button>
            </DialogActions>
          </Dialog>
        </Typography>
      </Container>
    );
}