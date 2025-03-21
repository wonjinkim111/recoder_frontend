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
    const classes = useStyles();

    const [open, setOpen]=React.useState(false);
    const [mentee, setMentee] = React.useState()

    const clickOpen = () => {
        setOpen(true);
    }
    const clickClose = () => {
        setOpen(false);
    }
    const formSubmit = e => {
        e.preventDefault();
        if(mentee === "") return;
        setMentee('')
        setOpen(false);
    //axios에서 받아서 하기
    const userId = JSON.parse(sessionStorage.getItem('user'));
    const url = `http://192.168.45.198:10000/users/mentee/${userId.id}`;
      axios.post(url, {
        menteeNickname : mentee
      })
      .then(response =>{
        let userData = JSON.parse(sessionStorage.getItem('user'));
        sessionStorage.setItem('user', JSON.stringify({id:userData.id, token:userData.token, mentorid: userData.mentorid, menteeid: response.data.menteeId}))
          alert('추가되었습니다.');
          sessionStorage.setItem('state',JSON.stringify('mentee'));
          props.history.push({
            pathname: '/menteedashboard/roomlist'
          });
          
      }
        ) 
        .catch(error => {
          alert("error")
        })
    //응답받아서 정상이면 멘토추가되었으니 페이지 변경하기

    }
    
    const handleChangeForm = e => {
        setMentee(e.target.value);
      }


    return(
        <Container >
            <Typography component="div" style={{borderRadius: '40px', border: '2px solid purple', margin: '10vh', backgroundColor: 'lavender', padding:'20vh'}} >
             <Button style={{position:"relative", left: "36%",}}variant="contained" color="secondary" onClick={clickOpen}>멘티생성하려면 클릭!</Button>
             <Dialog open={open} onClose={clickClose}>
                <DialogTitle>멘티 추가</DialogTitle>
                <DialogContent>
                <TextField 
                    label="닉네임" 
                    margin="normal" 
                    fullWidth 
                    autoFocus 
                    name="menteeNickname" 
                    value={mentee} 
                    error={mentee === ""} 
                    helperText={mentee === "" ? '닉네임을 입력해주세요!' : ' '} 
                    onChange={handleChangeForm}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={formSubmit}>추가</Button>
                    <Button variant="outlined" color="primary" onClick={clickClose}>닫기</Button>
                </DialogActions>
             </Dialog>
            </Typography>
        </Container>
    )
}