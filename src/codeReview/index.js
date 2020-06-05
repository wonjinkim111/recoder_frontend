import React, { Component } from "react";
import { render } from "react-dom";
import CodeEditor from "./container/CodeEditor";
import Comment from './container/Comment';
import './index.css';



class App extends Component{

  
  constructor() {
    super();
  
    this.state = {
      flag: 0,
      update_flag:0,
      outputText: '',
      codeState: 'mentee',
      theme:'vs-white',
      lineNumber: 0,
      modal_start:0,
      comment_flag:0,
      comment_tb:[
      {cmt_id:'',review_id:'',parent_id:'',menteeCode:'mentee code', content:'이곳을 고쳐보세요',cmt_line_number:1,cmt_reg_date:''},
      {cmt_id:'',review_id:'',parent_id:'',menteeCode:'int main(){  int i= 10;', content:'틀림',cmt_line_number:2,cmt_reg_date:''},
      {cmt_id:'',review_id:'',parent_id:'',menteeCode:'int main(){  int i= 10;', content:'test2',cmt_line_number:4,cmt_reg_date:''}
      ]
      
    };
  }

  componentWillMount(){
    document.getElementById('root').style.height="100%";
    document.getElementById('root').style.width="100%";
    setTimeout(()=>{
      this.setState({update_flag:0})},500); //페이지 로딩되면 업데이트 한번 일어나게 하려고 0.3초뒤에 업데이트 한번 일어나게 해줬음
  }
 
  componentDidUpdate(){ // 코드내용을 누르면 outputText lindNumber가 바뀌면서 업데이트가 일어남
    
    if(this.state.codeState == 'mentee'){
      //멘티 코드 총 라인 수
      let total_line = document.getElementsByClassName('view-lines')[0].childElementCount;
      let i =0;
      //전체 라인 표시 색깔 없애기
      console.log(total_line)
      while(i <total_line){ //선택한 곳이 첫번째줄이라면 스탑
        document.getElementsByClassName('view-lines')[0].childNodes[i].style.background = '';
        i++
      }
      //코멘트가 있는 곳만 색깔 표시
      //if(this.state.theme = "vs-white"){
        this.state.comment_tb.map((selectComment)=>{if(selectComment.cmt_line_number<total_line)
          //codeEditor에서 codeState값을 변경해주는 거보다 index에서 업데이트가 먼저 일어남  배열 오류 
          document.getElementsByClassName('view-lines')[0].childNodes[selectComment.cmt_line_number-1].style.background = 'lightgreen';
        })
      //}
      // else{
      //   this.state.comment_tb.map((selectComment)=>{
      //     document.getElementsByClassName('view-lines')[0].childNodes[selectComment.cmt_line_number-1].style.background = 'green';
      //   })
      // }

      if(this.state.flag == 1 && this.state.codeState=='mentee'){
      this.handleOpenModal();
      this.setState({flag: 0})    
      }
    }//if문 끝
    else{
      let total_line = document.getElementsByClassName('view-lines')[0].childElementCount;
      let i=0;
      //전체 라인 표시 색깔 없애기
      //console.log(total_line)
      while(i <total_line){ //선택한 곳이 첫번째줄이라면 스탑
        document.getElementsByClassName('view-lines')[0].childNodes[i].style.background = '';
        i++
      }
      document.getElementById("modal").style.display="none"; //멘토 코드 볼 때는 모창달 안생기게 설정
    } //else문 끝
  
  }


handleOpenModal = () =>{

    this.setState({modal_start:1})
    document.getElementById("modal").style.display="block";

      //클릭한 라인에 멘토의 커맨트가 있으면 내용을 띄워줌
      var txt = document.getElementById('comment_txt');

      var result = this.state.comment_tb.filter((selectComment) => {
        return (selectComment.cmt_line_number === this.state.lineNumber)
      })
      if (result.length !== 0){
        txt.value = result[0].content;
      } else {
        txt.value = '';
      }

      if(txt.value.length ==0){
        this.setState({comment_flag:0})
      }
      else{
        this.setState({comment_flag:1})
      }
}

handleCloseModal = () =>{
  this.setState({modal_start:0})
  document.getElementById("modal").style.display="none";

  //모달창을 닫을 때 해당 라인에 코멘트제출된 것이 없으면 backgound 색 없애줌
  var result = this.state.comment_tb.filter((selectComment) => {
    return (selectComment.cmt_line_number == this.state.lineNumber)
  })
  if (result.length === 0){
    document.getElementsByClassName('view-lines')[0].childNodes[this.state.lineNumber-1].style.background = '';
  }

}
handleSubmitModal = () =>{

  this.setState({modal_start:0})
  //e.preventDefault()
  // document.getElementById("modal").style.display="none";
  const {comment_tb} = this.state;
  //댓글내용,라인을 comment_tb에 저장
  var txt = document.getElementById('comment_txt');
  if(this.state.comment_flag == 0){

    
    this.setState({
      comment_tb: comment_tb.concat({cmt_line_number:this.state.lineNumber,
                                     content:txt.value,
                                    menteeCode:document.getElementsByClassName('view-lines')[0].getElementsByClassName('view-line')[this.state.lineNumber-1].textContent
                                  })
    })

   }

  else{

    this.setState({
      comment_tb: comment_tb.map(info => info.cmt_line_number ===this.state.lineNumber? {...info, content:txt.value}:info)
    })
  }

  document.getElementById("modal").style.display="none";
  //특정 라인의 배열 가져오기
  
  /*
  axios.post('/comment', {
    content: this.state.content,
    cmtLineNumber: this.state.lineNumber
  }).then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error)
  })

  */

}

handleValueChange=(e) =>{

  let nextState = {};
  nextState[e.target.name] = e.target.value;
  this.setState(nextState);
  console.log(e.target.name);
  }
// onChangeText(e){
//   this.setState({comment_content:e.target.value})
// }
  //editor에서 클릭한곳의 내용과 라인 넘버 가져옴
  handleOutputText = (text,number,flag) => {
    this.setState({outputText:text,
    lineNumber:number,
    flag:flag})
  };
  // handleTheme = (theme) =>{
  //   this.setState({
  //     theme:theme})
  //     console.log(this.state.theme);
  //   };
  
handleRemove=(lineNum)=>{
  // const {comment_tb} = this.state;
  this.setState({
    comment_tb: this.state.comment_tb.filter(info => info.cmt_line_number !== lineNum)
  })
  console.log(this.state.comment_tb);
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

  
  render() {
  const {lineNumber, outputText, comment_tb, modal_start} = this.state; 
 

    return (
      <div className="total-layout"> 

        {/* <div className="total-layout"> */}

        <div id="modal">
          <div className="modal_content">
              <div className="modal_head">
              &nbsp; Line{' '} {this.state.lineNumber}<br/>
              </div>
              <div className="modal_code">  {this.state.outputText.trim()} </div>   
            {/* <form > onSubmit={this.handleSubmitModal}  action="" method="post"   */}

                <textarea id="comment_txt" name="1" placeholder="input here" className="modal_input"></textarea>
                <button type="button" className="modal_cancel_btn" id="modal_cancel_btn" onClick={this.handleCloseModal}>CANCEL</button>
                <button type="button" className="modal_submit_btn" id="modal_submit_btn" onClick={this.handleSubmitModal} >SUBMIT</button>
             
            {/* </form> */}
          </div>
          <div className="modal_layer"></div>
        </div> {/* 모달 끝 */}



        <div className = "review_mentee_content">
        <div className="title"> ooo's code</div>
        <br/>
          고쳐주세요~~~
        </div>

        <div className="review_editor">
        <CodeEditor handleOutputText={this.handleOutputText} 
                    modal_start={modal_start}
                    handleState={this.handleState}
                    handleTheme={this.handleTheme}/>
        </div>

        <div className="review_comment">
          <div className="title"> &nbsp; Review</div>
        <Comment  handleRemove={this.handleRemove} 
                  lineNumber={lineNumber} 
                  outputText={outputText} 
                  comment_tb={comment_tb}/>
        </div>
        <div className = "compile_result">
          <div className="title" > &nbsp; 실행 결과</div>
          <textarea className="compile_result_content" placeholder="실행 결과가 여기에 표시됩니다." readOnly></textarea> 
        </div>
        {/* </div> */}
      </div>
    );
  }
}
export default App;