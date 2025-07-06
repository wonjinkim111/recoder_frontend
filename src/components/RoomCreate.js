import React from 'react'
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { green } from '@material-ui/core/colors';

//roomMax 
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


var profile_preview = null;
const styles = theme => ({

hidden: {

display: 'none'

}

});

//안쓰는듯
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
  }));

  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);


class RoomCreate extends React.Component {

constructor(props) {

super(props);

this.state = {
  file: null,
  fileName: '',
  open: false,
  previewURL: '',
  real_previewURL: '',
  roomIsPrivate: 1,
  roomName: '',
  roomInfo: '',
  roomMax:5,
  openRoomMax: false,
  titleError: '',
  contentError: ''
}


  this.handleFileChange = this.handleFileChange.bind(this)
  this.handleValueChange = this.handleValueChange.bind(this)
  this.handleClickOpen = this.handleClickOpen.bind(this)
  this.handleClose = this.handleClose.bind(this);
  this.blockNull = this.blockNull(this);
}

blockNull = () => {
  let titleError = "";
  let contentError = "";

  if(this.state.roomName.length === 0) titleError = "제목을 입력해 주세요";
  //this.setState({titleError:"제목을 입력해주세요"}) ;
  if(this.state.roomInfo.length === 0 ) contentError = "내용을 입력해 주세요";
  //this.setState({contentError:"내용을 입력해 주세요"});

  this.setState({
    titleError:titleError, contentError:contentError
  })

  if(titleError || contentError) return false;
  return true;
}

componentDidUpdate(){

    if(this.state.file !== ''){
      profile_preview = <img id ="test" className='profile_preview' src=""></img>
      
    }
}
handleCloseRoomMax = e => {
    this.setState({openRoomMax: false});
};
handleOpenRoomMax = e => {
    this.setState({openRoomMax : true});
};
handleChangeForm = e => {
    this.setState({[e.target.name]: e.target.value});
}
handleChange = (e) => {
    this.setState({ [e.target.name]: (e.target.checked)? 1:0 });
};



handleSubmit=(e)=>{
  e.preventDefault();
  
  const user = JSON.parse(sessionStorage.getItem('user'));
  console.log("✅ RoomCreate userData", user);

  if (!user || !user.mentorid) {
    console.error("❌ user.mentorid 값이 없습니다. 로그인부터 확인하세요.");
    alert("로그인 이후 이용 가능합니다.");
    return;
  }

  let form = new FormData();
  form.append('roomName', this.state.roomName);
  form.append('roomInfo', this.state.roomInfo);
  form.append('roomIsPrivate', this.state.roomIsPrivate);
  form.append('file',this.state.file);
  form.append('roomMax',this.state.roomMax);
  form.append('mentorId', user.mentorid); // ✅ mentorId 추가

  const url = `http://192.168.45.207:20000/room/${user.mentorid}`;
  axios.post(url, form,{
      headers: { 'Content-Type': 'multipart/form-data' }
  })
  .then(response =>{
      console.log(response.headers)
      alert('추가되었습니다.');
      window.location.href=`/mentor/roomlist`;
  })
  .catch(error => {
      console.log(error);
      alert("다시 시도해 주십시오")
      //   setValues({roomName:'', roomInfo:''});
      })
  // }
} // handleSubmit 끝



handleFileChange(e) {
  this.setState({
    file: e.target.files[0],
    fileName: e.target.value
  });




}


handleValueChange(e) {
  let nextState = {};
  nextState[e.target.name] = e.target.value;
  this.setState(nextState);
}


handleClickOpen() {
  this.setState({open: true});
}

handleClose() {
  this.setState({
    file: null,
    fileName: '',
    open: false
  })
}

render() {
const { classes } = this.props;




    



return (

<div>

<Button variant="contained" color="primary" onClick={this.handleClickOpen} style={{backgroundColor:"black",margin:'3vh', float:'right', right:'10vw'}}>
  방 생성하기
</Button>

<Dialog open={this.state.open} onClose={this.handleClose}>

  <DialogTitle>방 추가</DialogTitle>
  {/* <img src="C:\Users\HPE\Desktop\file-system-icon-27.jpg"></img> */}
 
  <DialogContent>

  <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />

  <label htmlFor="raised-button-file">

  <Button variant="contained" color="primary" component="span" name="file">
    {this.state.fileName === ''? "프로필 이미지 선택" : this.state.fileName}
  </Button>

  </label><br/>


  <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="roomName"
              label="방 이름"
              placeholder="방 이름을입력해주세요"
              name="roomName"
              autoComplete="roomName"
              autoFocus
              value={this.state.roomName}
              onChange={this.handleChangeForm}
            />
            {/* <div style={{ color: "red", fontSize: "12px" }}>
                  {error.roomNameError}
            </div> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rows={5}
              name="roomInfo"
              label="소개"
              type="roomInfo"
              id="roomInfo"
              placeholder="방을 소개해주세요"
              autoComplete="current-roomInfo"
              value={this.state.roomInfo}
                  onChange={this.handleChangeForm}
            />

  <InputLabel style={{position:"relative", left:"5%", bottom: "-15px"}}>누구나 방에 참여 할 수 있습니다 &nbsp;</InputLabel>
          <FormControlLabel
          style={{position:"relative",bottom:"15px",left:"0"}}
              control={<GreenCheckbox checked={this.state.roomIsPrivate} onChange={this.handleChange} name="roomIsPrivate" />}
          />
          


          <InputLabel style={{position:"relative", bottom: "-5px"}}>허용인원 &nbsp;</InputLabel>
          
          <Select
            labelId="demo-controlled-open-select-label"
            id=""
            style={{position:"relative",bottom:"25px",left:"85%"}}
            open={this.state.openRoomMax}
            name="roomMax"
            type= "roomMax"
            onClose={this.handleCloseRoomMax}
            onOpen={this.handleOpenRoomMax}
            value={this.state.roomMax}
            onChange={this.handleChangeForm}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
          

  </DialogContent>

  <DialogActions>
    <Button variant="contained" color="primary" onClick={this.handleSubmit}>추가</Button>
    <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
  </DialogActions>

</Dialog>

</div>

)

}

}

export default withStyles(styles)(RoomCreate)


