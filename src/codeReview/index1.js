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
///qwer

class App extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      error: '',
      compile_result:'',
      flag: 0,
      update_flag:0,
      outputText: '',
      codeState: 'mentee',
      theme:'vs-white',
      reviewReq:[],
      open: false,
      text : '',
      lineNumber: 0,
      modal_start:0,
      comment_flag:0,
      comment_tb:[
      // {cmt_id:'',review_id:'',parent_id:'',menteeCode:'mentee code', content:'이곳을 고쳐보세요',cmt_line_number:1,cmt_reg_date:''},
      // {cmt_id:'',review_id:'',parent_id:'',menteeCode:'int main(){  int i= 10;', content:'틀림',cmt_line_number:2,cmt_reg_date:''},
      // {cmt_id:'',review_id:'',parent_id:'',menteeCode:'int main(){  int i= 10;', content:'test2',cmt_line_number:4,cmt_reg_date:''}
      ]
      
    };
  }

  componentWillMount(){
    console.log("↵")
    document.getElementById('root').style.height="100%";
    document.getElementById('root').style.width="100%";
    setTimeout(()=>{
      this.setState({update_flag:0})},500); //페이지 로딩되면 업데이트 한번 일어나게 하려고 0.3초뒤에 업데이트 한번 일어나게 해줬음
  }

  componentDidMount(){
    const url1 = `http://192.168.45.76:30000/codereview/${this.props.match.params.id}`;
    axios.get(url1)
        .then(response =>{
           this.setState({ reviewReq : response.data})
           console.log(this.state.reviewReq)
      })
        // 응답(실패)
        .catch(function (error) {
          console.log(error);
        })

    const url2 = `http://192.168.45.76:40000/comment/${this.props.match.params.id}`;
    axios.get(url2)
        .then(response =>{
          console.log("여기는 코멘트 가져오기")
          console.log(response)

          this.setState({comment_tb:response.data})
        })
        // 응답(실패)
        .catch(function (error) {
          console.log(error);
        })
  }
 
  componentDidUpdate(){ // 코드내용을 누르면 setState({flag: 1 })되면서 업데이트 일어남
    if(this.state.codeState === 'mentee'){
      if(this.state.flag === 1 && this.state.codeState==='mentee'){
      this.handleOpenModal();
      this.setState({flag: 0})    
      }
    }
    else{
      //document.getElementById("modal").style.display="none"; //멘토 코드 볼 때는 모창달 안생기게 설정
      
    } 

  }



handleCompile = (result1) =>{
  this.setState({compile_result: result1});
  console.log(result1);
  console.log("compile")
}

handleOpenModal = () =>{
  this.setState({open: true});
    this.setState({modal_start:1})
    //document.getElementById("modal").style.display="block";

      //클릭한 라인에 멘토의 커맨트가 있으면 내용을 띄워줌
      //var txt = document.getElementById('comment_txt');
      var txt = this.state.text;
      var result = this.state.comment_tb.filter((selectComment) => {
        return (selectComment.cmtLineNumber === this.state.lineNumber)
      })
      if (result.length !== 0){
        //txt.value = result[0].content;
        //this.setState({text : result[0].content})
      } else {
        //txt.value = '';
        //this.setState({text :''})
      }

      if(this.state.text.length ===0){
        this.setState({comment_flag:0})
      }
      else{
        this.setState({comment_flag:1})
      }
}

handleCloseModal = () =>{
  this.setState({modal_start:0})
  this.setState({open: false});
  //document.getElementById("modal").style.display="none";

  

}
handleSubmitModal = () =>{
  this.setState({error:''})
  this.setState({modal_start:0})

  //e.preventDefault()
  // document.getElementById("modal").style.display="none";
  //const {comment_tb} = this.state;
  //댓글내용,라인을 comment_tb에 저장
  //var txt = document.getElementById('comment_txt');
  ///console.log(this.state.text)
  if(this.state.text.length){
  const user = JSON.parse(sessionStorage.getItem('user'));
  const url = 'http://192.168.45.76:40000/comment';
  console.log(this.props.match.params.id);
  console.log(this.state);
  axios.post(url, {
    reviewId : this.props.match.params.id,
    content : this.state.text,
    cmtLineNumber : this.state.lineNumber,
    nickName : user.mentorNickname,
    cmtCode : this.state.outputText
  })
   .then(response =>{console.log(response.data)
      console.log("됩니다유")
    window.location.href=`/review/${this.props.match.params.id}`;
  }
    ) 
    .catch(error => {
      console.log(error);
      alert("다시 시도해 주십시오")
    })

  
  this.setState({open: false});
}
else{
  this.setState({error:'글을 입력해 주세요'})
}
}


  //editor에서 클릭한곳의 내용과 라인 넘버 가져옴
  handleOutputText = (text,number,flag) => {
    this.setState({outputText:text,
    lineNumber:number,
    flag:flag})
  };

  
handleRemove=(lineNum)=>{
  // const {comment_tb} = this.state;
  this.setState({
    comment_tb: this.state.comment_tb.filter(info => info.cmt_line_number !== lineNum)
  })
  console.log(this.state.comment_tb);
}

handleChange= e =>{
  this.setState({text : e.target.value})
}

handleState = (state) =>{
  this.setState({codeState: state})
  console.log(this.state.codeState)
  setTimeout(()=>{
    this.setState({update_flag:0})},100);
  
}
  handleStartUpdate = ()=>{
    this.setState({flag:1});
  }

  //멘토인경우 멘토 룸 리스트로, 멘티인경우 멘티대쉬보드의 룸리스트로
  exit = ()=>{
    const state = JSON.parse(sessionStorage.getItem('state'));
    if(state === 'mentor'){
      window.location.href='/mentor/roomlist'
    }
    else if(state === 'mentee'){
      window.location.href='/menteedashboard';
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
              style={{ width: 400, wordBreak: "breakAll" }}
              rows={3}
              value={this.state.text}
              onChange={this.handleChange}
              placeholder="코멘트 달기"
            ></TextField>

            <div style={{ color: "red", fontSize: "12px" }}>
              {this.state.error}
            </div>

          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleSubmitModal}>커맨트달기</Button>
            <Button variant="outlined" color="primary" onClick={this.handleCloseModal}>닫기</Button>
          </DialogActions>
        </Dialog>

        
        <div className = "review_mentee_content">
        <div className="title"> {this.state.reviewReq.reviewTitle}

        <button className="exit" onClick={this.exit} type="button">
              나가기
            </button>
            </div>
        <br/>
        {this.state.reviewReq.reviewContent}
        </div>
        
        <div className="review_editor">
        <CodeEditor handleOutputText={this.handleOutputText} 
                    modal_start={modal_start}
                    handleState={this.handleState} 
                    comment_tb={comment_tb}
                    handleCompile1={handleCompile}/>
        </div>

         <div className="review_comment">
          <div className="title"> &nbsp; Review</div>
        <Comment  handleRemove={this.handleRemove} 
                  lineNumber={lineNumber} 
                  outputText={outputText}
                  comment_tb={comment_tb}/>
                  <div className="test">test</div>
                  <div className="test">test</div>
        </div>
      
        <div className = "compile_result">
          <div className="title" > &nbsp; 실행 결과
          <button className="selectButton2"  type="button">
              실행
            </button></div>

          <textarea className="compile_result_content" placeholder="실행 결과가 여기에 표시됩니다." readOnly>{this.state.compile_result}</textarea> 
        </div> 
      
      </div>
    );
  }
}
export default App;