import React, { Component } from 'react';
import MonacoEditor from './editor';
import './CodeEditor.css';
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { Link, Route, BrowserRouter as Router } from "react-router-dom"
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';

var color_flag = 1;
class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: JSON.parse(sessionStorage.getItem('state')),
      compile_result: '',
      color_flag111: 1,
      mount_flag: 1,
      comment_tb: [],
      code_state: 'mentee',
      code: "// type your code... \n",
      mentorCode: '',
      menteeCode: 'mentee code\nint main(){  int i= 10;\n  printf("%d",i);\n return 0;\n}',
      theme: "hc-black",
      language: "java",
      language1: 0,
      lineSelect: 'off',
      options: {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: true,
        cursorStyle: "line",
        automaticLayout: true,
      }
    };
  };
  componentDidUpdate() {

    if (this.props.comment_tb.length && color_flag >= 1) {
      console.log(this.props.comment_tb)
      this.props.comment_tb.map((comment) => {
        this.editor.deltaDecorations(
          this.editor.getModel().getAllDecorations(),
          [
            {
              range: { startLineNumber: comment.cmtLineNumber, startColumn: 1, endLineNumber: comment.cmtLineNumber, endColumn: 1 },
              options: {
                isWholeLine: true,
                // linesDecorationsClassName: "myLineDecoration",
                //inlineClassName: "myInlineDecoration"
                className: "myLineDecorationBlack",
                //glyphMarginClassName: 'myLineDecoration'
              }
            },
          ]
        );//decoration 끝  
      })
      console.log(this.editor.getModel().getAllDecorations())
      color_flag = -1;

    }

    if (color_flag < 0) {
      //   this.editor.deltaDecorations(   //내용이 추가되야 라인색깔이 적용이 되기 때문에 빈데이터 하나 추가해줌
      //   this.editor.getModel().getAllDecorations(),
      //   [ 
      //     {
      //       range: {startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0},
      //       options: {
      //         isWholeLine: true,
      //         className: '1'
      //       }
      //     },
      //   ]
      // );//decoration 끝
    }

  }

  editorDidMount = (editor) => {
    this.editor = editor;

    this.editor.onMouseDown(e => {
      console.log(e.target.position)
      if (this.state.code_state === 'mentee' && this.state.lineSelect === 'on') {  //멘티창에서 line선택기능이 on 일때만 커맨트 달 수 있음
        //console.log(e.target.element.parentNode)
        let line = e.target.position.lineNumber;
        let text = this.editor.getModel().getLineContent(e.target.position.lineNumber);
        this.props.handleOutputText(text, line, 1); // index에 클릭한 라인의 내용, 라인번호, 선택됐다는 flag=1를 전달
      }//if문 끝

    });//onMouse 끝

  }//editormount 끝



  //code 초기값 설정 componentDidMount로도 가능
  componentWillMount() {
    //토큰 받기
    // const user = JSON.parse(sessionStorage.getItem('user'));
    // const token = user.token;
    // var config = {
    //   headers: {
    //     'Authorization' : "Bearer "+ token,
    //     "Content-Type": "application/json",
    //     'Accept': '*/*'

    //   }
    // }
    const getUrl = document.location.href.split("/");
    const len = getUrl.length;
    console.log(getUrl)
    const url = `http://192.168.45.201:31920/codereview/${getUrl[len - 1]}`;
    axios.get(url)
      .then(response => {
        console.log("11111111111111" + response.data);
        this.setState({
          code: response.data.reviewCode,
          menteeCode: response.data.reviewCode,
          mentorCode: response.data.reviewCode,
          data: response.data
        })
        this.props.handleCompile_content(response.data.reviewCode)
      })
      // 응답(실패)
      .catch(function (error) {
        console.log(error);
      })

  }
  componentDidMount() {

  }

  handleCompile = () => { //실행 버튼 클릭 했을 때
    //console.log(this.editor.getValue().replace(/ /g,"")); //모든 공백 제거
    //console.log(this.editor.getValue().replace(/\s/gi,""));//모든 공백 제거
    if (this.editor) {
      if (this.state.code_state === "mentee")
        this.setState({ menteeCode: this.editor.getValue() });
      else
        this.setState({ mentorCode: this.editor.getValue() });
    }
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = user.token;
    var config = {
      headers: {
        'Authorization' : "Bearer "+ token,
        "Content-Type": "application/json",
        'Accept': '*/*'

      }
    }
    const url = `http://192.168.45.201:30103/codereview/compile2`
    axios.get(url)
      .then(function (response) {
        //console.log(response);
        this.setState({ compile_result: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  changeByMentee = () => {
    this.setState({
      code_state: 'mentee',
      code: this.state.menteeCode,
    });
    this.props.handleCompile_content(this.state.mentorCode)
    document.getElementById("mentorEditor").style.visibility = "hidden"   //Monaco 에티터를 멘티,멘토 두개 만들어놔서 멘토 에디터 hidden 멘티 에디터는 block으로
    document.getElementById("menteeEditor").style.display = "block"       // 에디터 한개만 보여지게 설정
    document.getElementById("menteeEditor").style.top = "-40.7vh"

    this.props.handleState('mentee');
    //readOnly : false -> true
    this.setState(prevState => ({
      options: {
        ...prevState.options,
        readOnly: true
      }
    }))
  };

  changeBackColor = (color) => {
    //var range = new monaco.Range(3, 1,3, 1)
    //console.log( this.editor.getModel().getAllDecorations());
    //console.log("삭제 후 남은 개수 :"+ Object.keys(this.editor.getModel().getAllDecorations()).length);
    //console.log("타입확인"+typeof(this.editor.getModel().getAllDecorations()))

    console.log(this.editor.getModel().getAllDecorations().length)
    for (let i = 0; i < Object.keys(this.editor.getModel().getAllDecorations()).length; i++) {
      this.editor.getModel().getAllDecorations()[i].options.className = color;
    }

  }
  changecolor_flag = () => {
    this.setState({ color_flag111: 1 })
  }

  changeByMentor = () => {
    this.setState({
      code_state: 'mentor',
      code: this.state.mentorCode,
    });
    this.props.handleCompile_content(this.state.mentorCode)
    document.getElementById("mentorEditor").style.visibility = "visible"
    document.getElementById("menteeEditor").style.display = "none"

    this.props.handleState('mentor');
    //readOnly : true -> false
    this.setState(prevState => ({
      options: {
        ...prevState.options,
        readOnly: false
      }
    }))
  }

  setLanguage = (e) => {
    if (e.target.value === 'java') this.setState({ language1: 0 })
    else if (e.target.value === 'c') this.setState({ language1: 1 })
    else if (e.target.value === 'cpp') this.setState({ language1: 2 })
  }

  setTheme = (e) => {
    this.setState({ theme: e.target.value })
    console.log(this.state.comment_tb)
    console.log(this.editor.getModel().getAllDecorations())
    if (e.target.value === "vs-white") {
      this.changeBackColor("myLineDecoration");
    }
    else if (e.target.value === "hc-black") {
      this.changeBackColor("myLineDecorationBlack");
    }
  }

  setLineSelect = (e) => {
    this.setState({ lineSelect: e.target.value })
  }

  render() {
    const { code, theme, language, lineSelect, options, code_state } = this.state;

    return (
      <div className="layout">
        {/* <div style={{height:'5vh',border:'1px solid grey'}}> */}
        <div className="title1">
          <button className="selectButton_mentee" onClick={this.changeByMentee} type="button">
            멘티
            </button>
          <button className="selectButton_mentor" onClick={this.changeByMentor} type="button">
            멘토
            </button>


          <select className="selectButton3" id="theme" value={this.state.value} onChange={this.setTheme} >
            <option value="hc-black">&nbsp;dark&nbsp;</option>
            <option value="vs-white">&nbsp;white&nbsp;</option>

          </select>


          <select className="selectButton4" id="language" value={this.state.value} size="1" onChange={this.setLanguage}>
            <option value="java">&nbsp;java&nbsp;</option>
            <option value="cpp">&nbsp;C++&nbsp;</option>
            <option value="cpp">&nbsp;C&nbsp;</option>
          </select>

          {this.state.type == "mentor" ? <select className="selectButton5" id="lineSelect" size="1" onChange={this.setLineSelect}>
            <option value="off">&nbsp; review off &nbsp;</option>
            <option value="on">&nbsp; review on &nbsp;</option>
          </select> : ""}




          {/* <Select
            labelId="demo-controlled-open-select-label"
            id="lineSelect" 
            height="100"
            value = {this.state.lineSelect}
            onChange={this.setLineSelect}
          >
            <MenuItem value={"off"}>review off</MenuItem>
            <MenuItem value={"on"}>review on</MenuItem>
          </Select> */}
          {/* <button className="selectButton2"  onClick={this.handleCompile} type="button">
              실행
            </button> */}


        </div >

        <div id="mentorEditor" style={{ display: "block", visibility: "hidden", zIndex: "-1" }}>

          <MonacoEditor
            height="45.9vh"
            width="55vw"
            language={language}
            //defaultValue={lineSelect}
            value={this.state.mentorCode}
            code_state={code_state}
            options={options}
            onChange={this.onChange}
            editorDidMount={this.editorDidMount}
            theme={theme}
            lineSelect={lineSelect}
            comment_tb={this.props.comment_tb}
            modal_start={this.props.modal_start}
          />
        </div>
        <div id="menteeEditor" style={{ display: "block", position: "relative", top: "-41vh", zIndex: "1" }}>
          <MonacoEditor
            height="45.9vh"
            width="55vw"
            language={language}
            //defaultValue={lineSelect}
            value={this.state.menteeCode}
            code_state={code_state}
            options={options}
            onChange={this.onChange}
            editorDidMount={this.editorDidMount}
            theme={theme}
            lineSelect={lineSelect}
            comment_tb={this.props.comment_tb}
            modal_start={this.props.modal_start}

          />
        </div>
      </div>
    );
  }
}

export default CodeEditor