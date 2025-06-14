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

export default function MenteeLogin(props){
  const [open, setOpen] = React.useState(false);
  const [mentee, setMentee] = React.useState('');

  const clickOpen = () => setOpen(true);
  const clickClose = () => setOpen(false);

  const handleChangeForm = e => setMentee(e.target.value);

  const formSubmit = e => {
    e.preventDefault();
    if (!mentee) return;

    const rawUser = sessionStorage.getItem("user");
    if (!rawUser) return alert("로그인이 필요합니다.");

    const userData = JSON.parse(rawUser);
    if (!userData.id) return alert("user id가 없습니다.");

    axios.post(`http://192.168.1.10:10000/users/mentee/${userData.id}`, {
      menteeNickname: mentee
    }).then(response => {
      sessionStorage.setItem("state", JSON.stringify("mentee"));
      sessionStorage.setItem("user", JSON.stringify({
        id: userData.id,
        token: userData.token,
        mentorId: userData.mentorId,   // ← 기존 mentorId 유지
        menteeId: response.data.menteeId
      }));
      props.history.push("/menteedashboard/roomlist");
    }).catch(() => {
      alert("멘티 등록 중 오류가 발생했습니다.");
    });

    setOpen(false);
    setMentee('');
  };

  return (
    <Container>
      <Typography>
        <Button onClick={clickOpen}>멘티생성하려면 클릭!</Button>
        <Dialog open={open} onClose={clickClose}>
          <DialogTitle>멘티 추가</DialogTitle>
          <DialogContent>
            <TextField label="닉네임" name="menteeNickname" fullWidth value={mentee} onChange={handleChangeForm} />
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