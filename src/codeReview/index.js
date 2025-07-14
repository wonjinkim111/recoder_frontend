import React, { Component } from "react";
import { render } from "react-dom";
import CodeEditor from "./container/CodeEditor";
import Comment from './container/Comment';
import './index.css';
import axios from 'axios';
import * as monaco from "monaco-editor";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

var compile_result = "";
var left_width = "49.4%";
var width_size = 98.8 - parseInt(left_width);
var right_width = width_size;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      flag: 0,
      compileResult: '',
      update_flag: 0,
      outputText: '',
      compileContent: '',
      codeState: 'mentee',
      theme: 'vs-white',
      reviewReq: [],
      open: false,
      text: '',
      nickname: '',
      user: [],
      lineNumber: 0,
      modal_start: 0,
      comment_flag: 0,
      comment_tb: [
        // {cmt_id:'',review_id:'',parent_id:'',menteeCode:'mentee code', content:'이곳을 고쳐보세요',cmt_line_number:1,cmt_reg_date:''},
        // {cmt_id:'',review_id:'',parent_id:'',menteeCode:'int main(){  int i= 10;', content:'틀림',cmt_line_number:2,cmt_reg_date:''},
        // {cmt_id:'',review_id:'',parent_id:'',menteeCode:'int main(){  int i= 10;', content:'test2',cmt_line_number:4,cmt_reg_date:''}
      ]

    };
  }


  componentWillMount() {
    console.log("↵")
    document.getElementById('root').style.height = "100%";
    document.getElementById('root').style.width = "100%";
    setTimeout(() => {
      this.setState({ update_flag: 0 })
    }, 500); //페이지 로딩되면 업데이트 한번 일어나게 하려고 0.3초뒤에 업데이트 한번 일어나게 해줬음
  }

  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = user.token;
    var config = {
      headers: {
        'Authorization' : "Bearer "+ "111111111111111111111",
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*'

      }
    }
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const url = `http://192.168.45.149:32513/users/${userData.id}`;
    axios.get(url)
      .then(response => {
        console.log(response)
        this.setState({
          user: response.data
        })

      })
      .catch(error => {
        // alert("error")
        console.log(error);
      })

    const url1 = `http://192.168.45.149:31920/codereview/${this.props.match.params.id}`;
    axios.get(url1)
      .then(response => {
        this.setState({ reviewReq: response.data })
        console.log(this.state.reviewReq)
      })
      // 응답(실패)
      .catch(function (error) {
        console.log(error);
      })

    const url2 = `http://192.168.45.149:30103/comment/${this.props.match.params.id}`;
    axios.get(url2)
      .then(response => {
        console.log("여기는 코멘트 가져오기")
        console.log(response)

        this.setState({ comment_tb: response.data })
      })
      // 응답(실패)
      .catch(function (error) {
        console.log(error);
      })
  }

  componentDidUpdate() { // 코드내용을 누르면 setState({flag: 1 })되면서 업데이트 일어남
    if (this.state.codeState === 'mentee') {
      if (this.state.flag === 1 && this.state.codeState === 'mentee') {
        this.handleOpenModal();
        this.setState({ flag: 0 })
      }
    }
    else {
      //document.getElementById("modal").style.display="none"; //멘토 코드 볼 때는 모창달 안생기게 설정

    }
    compile_result = this.state.compileResult;
  }



  // handleCompile = (result1) =>{
  //   this.setState({compile_result: result1});
  //   console.log(result1);
  //   console.log("compile")
  // }

  handleOpenModal = () => {
    this.setState({ open: true });
    this.setState({ modal_start: 1 })
    //document.getElementById("modal").style.display="block";

    //클릭한 라인에 멘토의 커맨트가 있으면 내용을 띄워줌
    //var txt = document.getElementById('comment_txt');
    var txt = this.state.text;
    var result = this.state.comment_tb.filter((selectComment) => {
      return (selectComment.cmtLineNumber === this.state.lineNumber)
    })
    if (result.length !== 0) {
      //txt.value = result[0].content;
      //this.setState({text : result[0].content})
    } else {
      //txt.value = '';
      //this.setState({text :''})
    }

    if (this.state.text.length === 0) {
      this.setState({ comment_flag: 0 })
    }
    else {
      this.setState({ comment_flag: 1 })
    }
  }

  handleCloseModal = () => {
    this.setState({ modal_start: 0 })
    this.setState({ open: false });
    //document.getElementById("modal").style.display="none";



  }
  handleSubmitModal = () => {
    this.setState({ error: '' })
    this.setState({ modal_start: 0 })

    // const user = JSON.parse(sessionStorage.getItem('user'));
    // const token = user.token;
    // var config = {
    //   headers: {
    //     'Authorization' : "Bearer "+ token,
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Accept': '*/*'
    //   }
    // }

    const type = JSON.parse(sessionStorage.getItem('state'));
    if (type === 'mentor') this.setState({ nickname: this.state.user.mentorNickname })
    else if (type === 'mentee') this.setState({ nickname: this.state.user.menteeNickname })


    if (this.state.text.length) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const url = 'http://192.168.45.149:30103/comment';
      console.log(this.props.match.params.id);




      axios.post(url, {
        reviewId: this.props.match.params.id,
        content: this.state.text,
        cmtLineNumber: this.state.lineNumber,
        nickName: "나는 멘토",
        cmtCode: this.state.outputText
      })
        .then(response => {
          console.log(response.data)
          console.log("됩니다유")
          window.location.href = `/review/${this.props.match.params.id}`;
        }
        )
        .catch(error => {
          console.log(error);
          alert("다시 시도해 주십시오")
        })


      this.setState({ open: false });
    }
    else {
      this.setState({ error: '글을 입력해 주세요' })
    }
  }

  handleCompile_content = (e) => {
    this.setState({ compileContent: e })
  }

  handleCompile = () => { //실행 버튼 클릭 했을 때
    //console.log(this.editor.getValue().replace(/ /g,"")); //모든 공백 제거
    //console.log(this.editor.getValue().replace(/\s/gi,""));//모든 공백 제거
    console.log(this.state.compileContent)
    const getUrl = document.location.href.split("/");
    const len = getUrl.length;
    console.log(getUrl[len - 1]);
    const url = `http://192.168.45.149:31920/codereview/compilewindow/${getUrl[len - 1]}`
    axios.get(url)
      .then(response => {
        console.log(response);
        console.log(response.data)
        // var data11 = JSON.parse(response);
        this.setState({ compileResult: response.data })
        compile_result = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("여기다")
    console.log("111111111111111111111" + compile_result)
  };


  //editor에서 클릭한곳의 내용과 라인 넘버 가져옴
  handleOutputText = (text, number, flag) => {
    this.setState({
      outputText: text,
      lineNumber: number,
      flag: flag
    })
  };


  handleRemove = (lineNum) => {
    // const {comment_tb} = this.state;
    this.setState({
      comment_tb: this.state.comment_tb.filter(info => info.cmt_line_number !== lineNum)
    })
    console.log(this.state.comment_tb);
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleState = (state) => {
    this.setState({ codeState: state })
    console.log(this.state.codeState)
    setTimeout(() => {
      this.setState({ update_flag: 0 })
    }, 100);

  }
  handleStartUpdate = () => {
    this.setState({ flag: 1 });
  }

  handlePosition = (e) => {
    console.log("1111" + document.getElementById("left1").style.width)
  }
  //멘토인경우 멘토 룸 리스트로, 멘티인경우 멘티대쉬보드의 룸리스트로
  exit = () => {
    const state = JSON.parse(sessionStorage.getItem('state'));
    if (state === 'mentor') {
      window.location.href = '/mentor/roomlist'
    }
    else if (state === 'mentee') {
      window.location.href = '/menteedashboard';
    }
  }

  render() {
    const { lineNumber, outputText, comment_tb, modal_start, handleCompile } = this.state;


    return (
      <div className="total-layout">


        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogContent>
            <div className="modal_head">&nbsp; Line{' '} {this.state.lineNumber}<br /></div>
            <div className="modal_code">  {this.state.outputText.trim()} </div>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              id="comment_txt"
              margin="normal"
              style={{ width: 550, wordBreak: "breakAll" }}
              rows={3}
              value={this.state.text}
              onChange={this.handleChange}
              placeholder="댓글 달기"
            ></TextField>

          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleSubmitModal}>커맨트달기</Button>
            <Button variant="outlined" color="primary" onClick={this.handleCloseModal}>닫기</Button>
          </DialogActions>
        </Dialog>

        {/* 왼쪽 */}
        <div className="left1" >
          <div className="title">
            <div className="content"> &nbsp;  {this.state.reviewReq.reviewTitle}</div>
            <button className="exit" onClick={this.exit} type="button">나가기</button>
          </div>
          <div className="review_mentee_content">
            {this.state.reviewReq.reviewContent}
          </div>
          <div className="title"> <div className="content"> &nbsp; Review </div></div>
          <div className="review_comment">
            <div>&nbsp;</div>
            <Comment handleRemove={this.handleRemove}
              lineNumber={lineNumber}
              outputText={outputText}
              comment_tb={comment_tb} />
          </div>
        </div>
        <div className="left2" >
          <div className="review_editor">

            <CodeEditor handleOutputText={this.handleOutputText}
              modal_start={modal_start}
              handleState={this.handleState}
              comment_tb={comment_tb}
              handleCompile_content={this.handleCompile_content}
              handleCompile1={handleCompile} />


          </div>
          <div className="title">
            <div className="content"> &nbsp; 실행결과  </div>
            <button className="selectButton2" onClick={this.handleCompile} type="button">실행</button>

          </div>
          <div className="compile_result_content" value={111} placeholder="실행 결과가 여기에 표시됩니다.">{compile_result}</div>

        </div>



      </div>
    );
  }
}
export default App;