import React from 'react'
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { green } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dropzone from "react-dropzone";
import './styles.css';
import MonacoEditor from '../codeReview/container/editor';
import CodeEditor from '../codeReview/container/CodeEditor';


const styles = theme => ({

hidden: {
display: 'none'
}
});

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


class ReviewReq extends React.Component {

constructor(props) {
super(props);
this.state = {

  open: false,

  reviewTitle: '',
  reviewContent: '',
  reviewCode:'',
  reviewLanguage: 0,
  openreviewLanguage: false,
  titleError: '',
  contentError:'',
  codeError: '',
  fileName:'',
  file: null
}

  this.handleValueChange = this.handleValueChange.bind(this)
  this.handleClickOpen = this.handleClickOpen.bind(this)
  this.handleClose = this.handleClose.bind(this);
  this.blockNull = this.blockNull.bind(this);
}

// file drop시 실행되는 함수
handleDrop = acceptfile => {
  console.log(acceptfile[0]);
  this.setState({fileName:acceptfile[0].name, file:acceptfile[0]});
}

handleClosereviewLanguage = e => {
    this.setState({openreviewLanguage: false});
};
handleOpenreviewLanguage = e => {
    this.setState({openreviewLanguage : true});
};
handleChangeForm = e => {
    this.setState({[e.target.name]: e.target.value});
}
handleChangeLanguage = e =>{
  if(e.target.value ==="java")
    this.setState({[e.target.name]: 0});
  else if(e.target.value ==="c"){
    this.setState({[e.target.name]: 1});
  }
  else if(e.target.value ==="cpp"){
    this.setState({[e.target.name]: 2});
  }
  else{
    this.setState({[e.target.name]: 3});
  }
}
handleChange = (e) => {
    this.setState({ [e.target.name]: (e.target.checked)? 1:0 });
};

blockNull = () => {
  let titleError = "";
  let contentError = "";
  let codeError = "";

  if(this.state.reviewTitle.length === 0) titleError = "제목을 입력해 주세요";
  //this.setState({titleError:"제목을 입력해주세요"}) ;
  if(this.state.reviewContent.length === 0 ) contentError = "내용을 입력해 주세요";
  //this.setState({contentError:"내용을 입력해 주세요"});
  // if(this.state.reviewCode.length === 0 ) codeError = "소스코드를 입력해 주세요";
  //this.setState({codeError:"소스코드를 입력해주세요"});
  if(this.state.file == null) codeError = "소스코드를 upload해 주세요";

  this.setState({
    titleError:titleError, contentError:contentError, codeError:codeError
  })

  if(titleError || contentError || codeError) return false;
  return true;
}

handleSubmit=(e)=>{
  e.preventDefault();
  // const user = JSON.parse(sessionStorage.getItem('user'));
  // window.location.href=`/menteedashboard?menteeid=${user.menteeid}`;
  //const valid = onTextValidation();   

  //if(!valid)console.error("invalid");
  
  // console.log("reviewTitle: "+this.state.reviewTitle)
  // console.log("reviewContent: "+this.state.reviewContent)
   console.log(this.state.reviewLanguage)
  // console.log("reviewCode: "+this.state.reviewCode)
  const valid = this.blockNull();
  if(!valid){
    console.error("not permit null")
  }

  else{   
  const user = JSON.parse(sessionStorage.getItem('user'));
    const url = 'http://192.168.45.51:31920/codereview/file';
    let form = new FormData();
    form.append('roomId', this.props.roomid);
    form.append('mentorId', this.props.mentorid);
    form.append('menteeId', user.menteeid);
    form.append('reviewLanguage',this.state.reviewLanguage);
    form.append('reviewTitle', this.state.reviewTitle);
    form.append('reviewContent', this.state.reviewContent);
    form.append('file', this.state.file)

    axios({
      method: 'post',
      url: `${url}`,
      data: form,
      headers: {'Content-Type' : 'multipart/form-data'}
    })
    .then(response => {
      console.log(response.headers)
      alert('추가 되었습니다.');
      window.location.href=`/menteedashboard/reviewlist`
    })
    .catch(error => {
      console.log(error);
      alert("다시 시도해 주십시오");
    })
  console.log(this.state.file);
  }
    //줄로 보내기
    // axios.post(url, {
    //   roomId: this.props.roomid,
    //   mentorId: this.props.mentorid,
    //   menteeId: user.menteeid,
    //   reviewTitle: this.state.reviewTitle,
    //   reviewContent: this.state.reviewContent,
    //   reviewCode: this.state.reviewCode
    // })
    //  .then(response =>{console.log(response.data)
    //     alert('추가되었습니다.');
    //     window.location.href=`/menteedashboard/reviewlist`;
        
    //   // this.props.history.push({
    //   //   pathname: '/mentor/roomlist'
    //   // });
    
    // }
    //   ) 
    //   .catch(error => {
    //     alert("다시 시도해 주십시오")
    //   //   setValues({reviewTitle:'', reviewContent:''});
    //   })
    // }
  
} // handleSubmit 끝

handleValueChange(e) {
  let nextState = {};
  nextState[e.target.name] = e.target.value;
  this.setState(nextState);
}

handleClickOpen() {
   const user = JSON.parse(sessionStorage.getItem('user'));
   console.log(user);
   //console.log(user.menteeid);
   if(user === null){
    alert("로그인하세요")
    window.location.href='/signin';
   }

   else if(user.menteeid == 0){
    alert("멘티계정을 생성하세요")
    window.location.href='/menteelogin';
   }

   else if(user.mentorid == this.props.mentorid){
     alert("자기 자신한테는 리뷰를 요청할 수 없습니다!")
   }

   else{
      this.setState({open: true});
   }
}

handleClose() {
  this.setState({
    open: false
  })
}

render() {

const { classes } = this.props;
//console.log('props값' ,this.props);
//console.log('왜안찍혀');

return (
  <div>
    <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
      리뷰신청
    </Button>

    <Dialog open={this.state.open} onClose={this.handleClose}>
      <DialogTitle>리뷰 신청</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="reviewTitle"
          label="제목"
          placeholder="제목을 입력해주세요"
          name="reviewTitle"
          autoComplete="reviewTitle"
          autoFocus
          value={this.state.reviewTitle}
          onChange={this.handleChangeForm}
        />
        <div style={{ color: "red", fontSize: "12px" }}>
          {this.state.titleError}
        </div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline
          rows={5}
          name="reviewContent"
          label="설명"
          type="reviewContent"
          id="reviewContent"
          placeholder="설명을 입력해주세요"
          autoComplete="current-reviewContent"
          value={this.state.reviewContent}
          onChange={this.handleChangeForm}
        />
        <div style={{ color: "red", fontSize: "12px" }}>
          {this.state.contentError}
        </div>
        <Select
          labelId="demo-controlled-open-select-label"
          style={{ position: "relative", bottom: "-5px", left: "0%", margin:'1vw'}}
          open={this.state.openreviewLanguage}
          name="reviewLanguage"
          onClose={this.handleClosereviewLanguage}
          onOpen={this.handleOpenreviewLanguage}
          value={this.state.reviewLanguage}
          onChange={this.handleChangeForm}
        >
          <MenuItem value="0">java</MenuItem>
          <MenuItem value="1">c</MenuItem>
          <MenuItem value="2">c++</MenuItem>
        </Select>
        {/* <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline
          rows={10}
          name="reviewCode"
          label="코드"
          type="reviewCode"
          id="reviewCode"
          placeholder="코드을 입력해주세요"
          autoComplete="current-reviewCode"
          value={this.state.reviewCode}
          onChange={this.handleChangeForm}
        /> */}

        <Dropzone onDrop={this.handleDrop}>
         {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject
        }) => {
          // additional CSS depends on dragging status
          const additionalClass = isDragAccept
            ? "accept"
            : isDragReject
            ? "reject"
            : "";
            return (
              <div
                {...getRootProps({
                  className: `dropzone ${additionalClass}`
                })}
              >
                <input {...getInputProps()} />
                <span>{isDragActive ? "📂" : "📁"}</span>
                <p>Drag'n'drop file, or click to select files</p>
              </div>
            );
          }}
        </Dropzone>
        <div>
          <strong>File:</strong>
          <ul>{this.fileName}
          </ul>
        </div>
        <div style={{ color: "red", fontSize: "12px" }}>
          {this.state.codeError}
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={this.handleSubmit}>신청</Button>
        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  </div>
)}}

export default withStyles(styles)(ReviewReq)


