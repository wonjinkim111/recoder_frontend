import React, { Component } from 'react'
import './Comment_sub.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class Comment_sub extends Component {

    constructor(props) {

        super(props);
        this.state = {
          open: false,
          content:''
        } 
    }


    //댓글 : modal2
    handleSpreadContent=()=>{

        document.getElementById("modal2").style.display=(document.getElementById("modal2").style.display=="none")? "block": "none";

            
    }

    //삭제 : modal3
    handle3Remove=()=>{
        //console.log(this.props.cmt_line_number)
        document.getElementById("modal3").style.display="none";
        this.props.handleRemove(this.props.cmt_line_number);
    }

    handleModal3Close=()=>{
        document.getElementById("modal3").style.display="none";
    }

    handleModal3Remove=()=>{
        document.getElementById("modal3").style.display="block";
    }
    
    handleClickOpen=()=> {
        this.setState({open: true});
      }
      

      
      handleClose=()=> {
        this.setState({
          open: false
        })
      }

      handleChangeForm=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit=()=>{
        const url = ``;
        axios.post(url,{

        }).then(response =>{console.log(response.headers)
        alert('댓글이 추가되었습니다.');
        window.location.href='/review';
    
    }
      ) 
      .catch(error => {
        alert("다시 시도해 주십시오")
      //   setValues({roomName:'', roomInfo:''});
      })
    }
    render() {
        return (
            <div>
                {/* 댓글부분 모달 */}
                {/* <div id="modal2">
                    <div className="modal_content">

                            하이
                   
                    </div>
                    <div className="modal_layer"></div>
                </div>  */}
                {/* 모달 끝 */}
                {/*정말로 삭제? 모달*/}
                <div id="modal3">
                    <div className="modal_content">
                                
                        &nbsp;    정말로 삭제하시겠습니까?
                <button type="button" className="modal_submit_btn" id="modal_cancel_btn" onClick={this.handle3Remove} >삭제</button>
                <button type="button" className="modal_cancel_btn" id="modal_submit_btn" onClick={this.handleModal3Close}>취소</button>
                
                    </div>
                    <div className="modal_layer"></div>
                </div> 

                <div  className = "comment_sub">
                <div className="lineNumber">
                 Line{' '} {this.props.cmt_line_number}<br/>
                </div>
                <div className = "menteeCode">
                   &nbsp; {this.props.menteeCode}
                </div>
                <span className="mentorContent">
                    {this.props.content}
                </span>
                <br/><br/>
                <div id="modal2">
                    <div className="modal_content">
                                하이
                    </div>
                </div>
                <button type="button" className="modal_comment_open_btn"  onClick={this.handleClickOpen}>댓글</button>
                <button type="button" className="modal_comment_remove_btn" onClick={this.handleModal3Remove}>삭제</button>
                </div>
                <Dialog open={this.state.open} onClose={this.handleClose}>

  <DialogTitle>댓글</DialogTitle>

  <DialogContent>


  
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rows={3}
              cols={200}
              name="content"
              label="댓글"
              type="content"
              id="content"
              placeholder="댓글을 달아주세요"
              autoComplete="current-content"
              value={this.state.content}
                  onChange={this.handleChangeForm}
            />


          

          

  </DialogContent>

  <DialogActions>
    <Button variant="contained" color="primary" onClick={this.handleSubmit}>댓글달기</Button>
    <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
  </DialogActions>

</Dialog>
            </div>
        )
    }
}