import React, { Component } from 'react'
import './Comment_sub.css';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

var comment_cmtId = 0;
export default class Comment_sub extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          open: false,
          realOpen: false,
          text : '',
        }
    }


    //댓글 : modal2
    handleOpenContent=(e)=>{
        comment_cmtId = e.target.value;
        this.setState({open: true});

    }
    handleClose=()=>{
        this.setState({open: false});
    }

    handleSubmit=()=>{

        console.log(this.state.text)
        const user_nickname = sessionStorage.getItem('user.nickname')
        const url = 'http://59.29.224.144:40000/comment/reply';
        axios.post(url, {
            cmtId : comment_cmtId,
            replyContent : this.state.text,
            nickname : "하이",
          })
           .then(response =>{console.log(response.data)
              
            window.location.href="/review"
          
          }
            ) 
            .catch(error => {
              alert("다시 시도해 주십시오")
            })
        
    }

    handleModal3Close=()=>{
        this.setState({realOpen: false});

    }

    handleOpenRemove=(e)=>{

        this.setState({realOpen: true});
        comment_cmtId = e.target.value;
    }

    handleChange= e =>{
        this.setState({text : e.target.value})
    }

    handleRemove=()=>{  //정말로 삭제

        console.log(comment_cmtId)
        const form  = new FormData();
        form.append('cmtId',comment_cmtId);
        const url = `http://59.29.224.144:40000/comment?cmtId=${comment_cmtId}`;
        axios.delete(url) 
          .then(response =>{console.log(response.data)
      
            
          
          }
            ) 
            .catch(error => {
              alert("다시 시도해 주십시오")
            })
            this.setState({realOpen: true});
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
            
                <Dialog open={this.state.realOpen} onClose={this.handleModal3Close}>
                    <div className="modal_content">
                                 
                        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  정말로 삭제하시겠습니까?  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <DialogActions>
                <Button type="button" variant="contained" /*className="modal_submit_btn"*/   onClick={this.handleRemove} >삭제</Button>
                <Button type="button" variant="contained" /* className="modal_cancel_btn"*/  onClick={this.handleModal3Close}>취소</Button>
                </DialogActions>
                    </div>
                    <div className="modal_layer"></div>
                </Dialog> 


                <div  className = "comment_sub">
                <div className="lineNumber">
                 Line{' '} {this.props.cmt_line_number}<br/>
                </div>
                <div className = "menteeCode">
                   &nbsp; {this.props.menteeCode}
                </div>
                <div className="mentorContent">
                    {this.props.content}
                </div>

                <br/><br/>

                <button type="button" className="modal_comment_open_btn" value={this.props.cmtId} onClick={this.handleOpenContent}>댓글</button>
                <button type="button" className="modal_comment_remove_btn" value={this.props.cmtId} onClick={this.handleOpenRemove}>삭제</button>
                </div>


                <Dialog  open={this.state.open} onClose={this.handleClose}>

<DialogTitle>댓글</DialogTitle>

<DialogContent>

                                <div  style={{ height:"25vh",overflowY: 'scroll'}}>
                        <div style={{  ovpadding:10,fontSize:15}}>{this.props.replys.map((reply, index) =>{ 
                            
                                return (<div style={{  padding:"10px"  }}>
                                        {reply.nickname}<br/>{reply.replyContent}
                                    
                                    </div>
                                );
                             })
                            }
                        </div>  
                </div>
     
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            id="comment_txt"
            margin="normal"
            style={{width:400, wordBreak:"breakAll"}}
            rows={3}
            value={this.state.text}
            onChange={this.handleChange}
            placeholder="댓글 달기"
          ></TextField>

        
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