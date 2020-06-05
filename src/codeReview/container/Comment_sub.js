import React, { Component } from '../../../node_modules/react'
import './Comment_sub.css';
export default class Comment_sub extends Component {




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
              
                <button type="button" className="modal_comment_open_btn"  onClick={this.handleSpreadContent}>댓글</button>
                <button type="button" className="modal_comment_remove_btn" onClick={this.handleModal3Remove}>삭제</button>
                </div>
                <div id="modal2">
                    <div className="modal_content">
                                하이
                    </div>
                    <div className="modal_layer"></div>
                </div>
            </div>
        )
    }
}
