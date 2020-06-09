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

const styles = theme => ({
    hidden: {  
    display: 'none'  
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
        
        roomIsPrivate: 1,
        roomName: '',
        roomInfo: '',
        roomMax:5,
        openRoomMax: false,
        }
        
        // this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        }
        
        componentDidMount(){
            const roomId = 3;
            const url = `http://59.29.224.144:20000/room/${roomId}`;
            axios.get(url)
                .then(response => {
                    console.log(response)
                    // this.setState({
                    // })
                })
        }

        handleCloseRoomMax = e => {
            this.setState({openRoomMax: false});
        };
        handleOpenRoomMax = e => {
            this.setState({openRoomMax : true});
          };
        
        handleChangeForm = e => {
            this.setState({[e.target.name]: e.target.value});
            console.log(e.target.value);
        }
        handleChange = (e) => {
            this.setState({ [e.target.name]: (e.target.checked)? 1:0 });
            console.log(e.target.value);
        };

        handleSubmit=(e)=>{
            e.preventDefault();
            //const valid = onTextValidation();   
        
          //if(!valid)console.error("invalid");
          
         // else{
          console.log("roomName: "+this.state.roomName)
          console.log("roomInfo: "+this.state.roomInfo)
          console.log("roomIsPrivate: "+this.state.roomIsPrivate)
          console.log("roomMax: "+this.state.roomMax)
          console.log("roomLanguage: "+this.state.roomLanguage)
          console.log("file: "+this.state.file)
          
          const user = JSON.parse(localStorage.getItem('user'));
            const url = `http://59.29.224.144:20000/room/1`;
            axios.post(url, {
              roomName: this.state.roomName,
              roomInfo: this.state.roomInfo,
              roomIsPrivate: this.state.roomIsPrivate,
              roomMax: this.state.roomMax,
              roomLanguage:this.state.roomLanguage,
              file:this.state.file
            })
             .then(response =>{console.log(response.headers)
        
              this.props.history.push({
                pathname: '/'
              });
            
            }
              ) 
              .catch(error => {
                alert("방이름이 이미 존재합니다")
              //   setValues({roomName:'', roomInfo:''});
              })
            
          //}
        } // handleSubmit 끝
        
        handleModify = (e) => {

        }

        handleDelete = (e) => {

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

    render(){
        const {classes} = this.props;
        return(
                <Container maxWidth="sm" style={{flexDirection:'row', display: 'flex', marginTop:'10vh', justifyContent:'flex-start'}}>
                    <div>
                <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                <label htmlFor="raised-button-file">
                <Button variant="contained" color="primary" component="span" name="file">
                    {this.state.fileName === ''? "방 이미지 선택" : this.state.fileName}
                </Button>
                </label><br/>
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
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                </Select>
                <div style={{textAlign:'center'}}>
                <Button style={{margin:'1vw'}} variant="contained" color="primary" onClick={this.handleModify}>수정하기</Button>
                <Button style={{margin:'1vw'}} variant="contained" color="secondary" onClick={this.handleDelete}>삭제하기</Button>
                </div>
                </div>
                </Container>
        )
    }
}

export default withStyles(styles)(MentorRoom);