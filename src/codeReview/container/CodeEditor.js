import React, {Component} from 'react';
import MonacoEditor from './editor';
import './CodeEditor.css';
class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code_state : 'mentee',
      code: "// type your code... \n",
      mentorCode: 'mentor code \n',
      menteeCode:'mentee code\nint main(){  int i= 10;\n  printf("%d",i);\n return 0;\n}',
      theme: "vs-light",
      language:"java",
      lineSelect: 'on',
      options: {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: true,
        cursorStyle: "line",
        automaticLayout: true,
      }
    };
  };
    //code 초기값 설정 componentDidMount로도 가능
    componentDidMount(){
      this.setState({ code: this.state.menteeCode,
        code_state:this.state.code_state
      });


    // axios.get("http://localhost:8083/codeReview/user?ID=12345")
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     // 응답(실패)
    //     .catch(function (error) {
    //       console.log(error);
    //     })
    }


    onChange = (newValue, number, flag) => {
      this.props.handleOutputText(newValue,number,flag); //텍스트값 받음
      //console.log("onChange", newValue); // eslint-disable-line no-console
    };
  
    editorDidMount = (editor) => {
      // eslint-disable-next-line no-console
      console.log("editorDidMount", editor, editor.getValue(), editor.getModel());
      this.editor = editor;

    };
  
    handleCompile = () => { //실행 버튼 클릭 했을 때
      console.log(this.editor.getValue().replace(/ /g,"")); //모든 공백 제거
      console.log(this.editor.getValue().replace(/\s/gi,""));//모든 공백 제거
      if (this.editor) {
        if(this.state.code_state == "mentee")
        this.setState({ menteeCode: this.editor.getValue() });
        else
        this.setState({ mentorCode: this.editor.getValue() });
      }
      // axios.post('/compile', {
      //   code: this.editor.getValue()
      // })
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    };
  
    changeByMentee = () => {
      this.setState({ code_state: 'mentee',
                      code: this.state.menteeCode,
                      
      });
      this.setState({code_state: 'mentee'})
   
      this.props.handleState('mentee');
      //readOnly : false -> true
      this.setState(prevState =>({
        options:{...prevState.options,
        readOnly: true}
      }))
      //console.logconsole.log(document.getElementsByClassName("margin-view-overlays").firstChild);
      //console.log(comment.firstChild.innerHTML);
      
    };
  
    changeByMentor = () =>{
      
      this.setState({ code_state: 'mentor',
                      code: this.state.mentorCode,
                      
      });
      this.setState({code_state: 'mentor'})

      this.props.handleState('mentor');
      console.log(":" + this.state.code_state)
      //readOnly : true -> false
      this.setState(prevState =>({
        options:{...prevState.options,
        readOnly: false}
      }))
      
    }



    setLanguage = (e) =>{
        this.setState({language: e.target.value})
      }
    
      setTheme = (e)=>{
        this.setState({theme: e.target.value})
        //this.props.handleTheme(e.target.value);
      }
  
      setLineSelect = (e) =>{
          this.setState({lineSelect: e.target.value})
      }

    render() {
      const { code, theme, language, lineSelect, options, code_state } = this.state;
      return (
        <div>
          <div style={{height:'5vh',border:'1px solid grey'}}>
          <form >
               <select className="selectButton3" id="theme"  value={this.state.value}  onChange={this.setTheme} >
                  <option value="vs-white">white</option>
                  <option value="vs-dark">dark</option>
               </select>
            </form>
        <form >
              <select className="selectButton3" id="language" value={this.state.value} size="1" onChange={this.setLanguage}>
                <option value="java">java</option>
                <option value="javascript">javascript</option>
                <option value="cpp">C++</option>
                <option value="cpp">C</option>
              </select>
          </form>
          <form >
					<select className="selectButton3"id="lineSelect"  size="1" onChange={this.setLineSelect}>
            <option value="off">line_select_off</option>
						<option value="on">line_select_on</option>
					</select>
				</form>
            <button className="selectButton2"  onClick={this.handleCompile} type="button">
              실행
            </button>
            <button className="selectButton" onClick={this.changeByMentee} type="button">
              멘티
            </button>
            <button className="selectButton"  onClick={this.changeByMentor} type="button">
              멘토
            </button>

            
          </div >
          <MonacoEditor
            height="45vh"
            width="54vw"
            language={language}
            //defaultValue={lineSelect}
            value={code}
            code_state={code_state}
            options={options}
            onChange={this.onChange}
            editorDidMount={this.editorDidMount}
            theme={theme}
            lineSelect={lineSelect}
            modal_start={this.props.modal_start}
          />
        </div>
      );
    }
  }

  export default CodeEditor