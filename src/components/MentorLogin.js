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
    const [mentor, setMentor] = React.useState({
        mentorNickname : '',
        introduction: ''
    })
    const [user, setUser] = React.useState({
        id:'',
        token:'',
        mentorid:'',
        menteeid:''
    })

    const clickOpen = () => {
        setOpen(true);
    }
    const clickClose = () => {
        setOpen(false);
    }
    const formSubmit = e => {
        e.preventDefault();
        if(mentor.mentorNickname === "" || mentor.introduction === "") return;
        setMentor({
            mentorNickname: '',
            introduction: ''
        })
        setOpen(false);
    //axios에서 받아서 하기
    const userId = JSON.parse(sessionStorage.getItem('user'));
    //const userId = 60;
    const url = `http://192.168.45.7145.207:10000/users/mentor/${userId.id}`;
      axios.post(url, {
        mentorNickname : mentor.mentorNickname,
        introduction : mentor.introduction
      })
      .then(response =>{
          //console.log(response.headers);
          alert('추가되었습니다.');
          console.log(response.data);
          sessionStorage.setItem('state',JSON.stringify('mentor'));
          let userData = JSON.parse(sessionStorage.getItem('user'));
        sessionStorage.setItem('user', JSON.stringify({
            id:userData.id, 
            token:userData.token, 
            mentorid: response.data.mentorId, 
            menteeid: userData.menteeid
        }))
        console.log("session userData 저장:", JSON.parse(sessionStorage.getItem("user")));
          props.history.push({
            pathname: '/mentor/roomlist'
          });
      }
        ) 
        .catch(error => {
            console.log(error);
          alert("error")
        })
    //응답받아서 정상이면 멘토추가되었으니 페이지 변경하기

    }
    
    const handleChangeForm = e => {
        setMentor({...mentor, [e.target.name]: e.target.value});
      }


    return(
        <Container >
            <Typography component="div" style={{borderRadius: '40px', border: '2px solid purple', margin: '10vh', backgroundColor: 'lavender', padding:'20vh'}} >
             <Button style={{position:"relative", left: "36%",}}variant="contained" color="secondary" onClick={clickOpen}>멘토생성하려면 클릭!</Button>
             <Dialog open={open} onClose={clickClose}>
                <DialogTitle>멘토 추가</DialogTitle>
                <DialogContent>
                <TextField 
                    label="닉네임" 
                    margin="normal" 
                    fullWidth 
                    autoFocus 
                    name="mentorNickname" 
                    value={mentor.mentorNickname} 
                    error={mentor.mentorNickname === ""} 
                    helperText={mentor.mentorNickname === "" ? '닉네임을 입력해주세요!' : ' '} 
                    onChange={handleChangeForm}/>
                <TextField 
                    label="멘토 정보" 
                    margin="normal" 
                    fullWidth 
                    multiline 
                    rows={3} 
                    variant="outlined" 
                    name="introduction" 
                    value={mentor.introduction}
                    error={mentor.introduction === ""} 
                    helperText={mentor.introduction === "" ? '정보를 입력해주세요' : ' '} 
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