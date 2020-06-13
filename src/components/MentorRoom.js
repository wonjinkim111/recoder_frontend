import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    hidden: {  
    display: 'none'  
        },
    image: {
      maxHeight: '50vh',
      maxWidth: '30vw'
    },
    button: {
      marginTop: '1vh',
      bottom : 0
      
    }  
    });

    
      const GreenCheckbox = withStyles({
        root: {
          color: green[400],
          '&$checked': {
            color: green[600],
          },
        },
        checked: {},
      })((props) => <Checkbox color="default" {...props} />);

class MentorRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      fileName: '',
      open: false,
      dialogopen: false,

      roomIsPrivate: 1,
      roomName: '',
      roomInfo: '',
      roomMax: 5,
      roomPicture: '',
      openRoomMax: false,
      roomId: '',
    }

    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    // const getUrl = document.location.href.split("?");
    // const roomId = getUrl[1].split("=");
    const roomId = this.props.match.params.id;
    const url = `http://59.29.224.144:20000/room/${roomId}`;
    axios.get(url)
      .then(response => {
        console.log(response)
        this.setState({
          roomName: response.data.roomName,
          roomInfo: response.data.roomInfo,
          roomIsPrivate: response.data.roomIsPrivate ? 1 : 0,
          roomMax: response.data.roomMax,
          roomLanguage: response.data.roomLanguage,
          roomId: response.data.roomId,
          file: response.data.roomPicture
        })
        // console.log(response.data);
        // console.log('roomName' + this.state.roomName);
        // console.log('roomInfo' + this.state.roomInfo);
        // console.log('roomIsPrivate' + this.state.roomIsPrivate);
        // console.log('file' + this.state.file);
        // console.log('roomPicture' + this.state.roomPicture);
        // console.log('roomMax' + this.state.roomMax);
      })
  }

  //삭제하기 버튼
  handleClickOpen = () => {
    this.setState({ dialogopen: true });
  };

  handleClose = () => {
    this.setState({ dialogopen: false });
  };

  //room Max
  handleCloseRoomMax = e => {
    this.setState({ openRoomMax: false });
  };
  handleOpenRoomMax = e => {
    this.setState({ openRoomMax: true });
  };

  handleChangeForm = e => {
    this.setState({ [e.target.name]: e.target.value });
   //console.log(e.target.value);
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: (e.target.checked) ? 1 : 0 });
    //console.log(e.target.value);
  };

  //이미지 태그에 이미지 올라오는부분인데 안됨
  onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        var img = document.createElement('img');
        img.setAttribute("src", e.target.result);
        document.querySelector("div#image_container").appendChild(img);
        //this.setState({image: e.target.result});
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  //수정하기
  handleModify = (e) => {
    let form = new FormData();
    form.append('roomId', this.state.roomId)
    form.append('roomName', this.state.roomName);
    form.append('roomInfo', this.state.roomInfo);
    form.append('roomIsPrivate', this.state.roomIsPrivate);
    form.append('file', this.state.file);
    form.append('roomMax', this.state.roomMax);

    const url = `http://59.29.224.144:20000/room/`;
    axios.put(url, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response.headers)
        alert('수정 되었습니다.');
      }
      )
      .catch(error => {
        console.log(error);
        alert("다시 시도해 주십시오");
      })
    console.log(this.state.file);
  }

  //삭제하기
  handleDelete = (e) => {
    //const roomId = 35;
    const url = `http://59.29.224.144:20000/room/${this.state.roomId}`;

    axios.delete(url)
      .then(response => {
        console.log(response);
        alert('삭제가 완료되었습니다.');
        window.location.href= `/mentor/roomlist`;
      })
      .catch(error => alert(error));
  }

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
    this.setState({
      open: true
    });
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
    //const image2 = this.state.image;
    //const image1 = require([image2]);
    const image1 = require('../images/room2.jpg');

    return (
      <Container maxWidth="md" style={{ marginTop: '10vh' }}>
        <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'flex-start', position: 'relative' }}>
          <div>
            {/* <div id="image_container"></div> */}
            <img className={classes.image} src={image1} />
            <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
            <label htmlFor="raised-button-file">
              <Button className={classes.button} variant="contained" color="primary" component="span" name="file"
                onChange={this.onImageChange}
              >
                {this.state.fileName === '' ? "방 이미지 선택" : this.state.fileName}
              </Button>
            </label><br />
          </div>
          <div>
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

            <InputLabel style={{ position: "relative", left: "5%", bottom: "-15px" }}>누구나 방에 참여 할 수 있습니다 &nbsp;</InputLabel>
            <FormControlLabel
              style={{ position: "relative", bottom: "15px", left: "0" }}
              control={<GreenCheckbox checked={this.state.roomIsPrivate} onChange={this.handleChange} name="roomIsPrivate" />}
            />

            <InputLabel style={{ position: "relative", bottom: "-5px" }}>허용인원 &nbsp;</InputLabel>

            <Select
              labelId="demo-controlled-open-select-label"
              id=""
              style={{ position: "relative", bottom: "25px", left: "85%" }}
              open={this.state.openRoomMax}
              name="roomMax"
              type="roomMax"
              onClose={this.handleCloseRoomMax}
              onOpen={this.handleOpenRoomMax}
              value={this.state.roomMax}
              onChange={this.handleChangeForm}
            >
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2vh' }}>
          <Button style={{ margin: '1vw', width: '20vw' }} variant="contained" color="primary" onClick={this.handleModify}>수정하기</Button>
          <Button style={{ margin: '1vw', width: '20vw' }} variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제하기</Button>
        </div>
        <Dialog
          open={this.state.dialogopen}
          TransitionComponent={this.Transition}
          keepMounted
          onClose={this.handleClose}
        >
          <DialogTitle id="alert-dialog-slide-title" style={{ color: 'red' }}>{"방삭제"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {`'${this.state.roomName}'를 정말 삭제하시겠습니까?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDelete} variant="contained" color="primary">
              예
                        </Button>
            <Button onClick={this.handleClose} variant="outlined" color="primary">
              취소
                        </Button>
          </DialogActions>
        </Dialog>
      </Container>
    )
  }
}

export default withStyles(styles)(MentorRoom);