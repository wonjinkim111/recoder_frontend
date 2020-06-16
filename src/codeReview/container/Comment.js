import React, { Component } from 'react'
import Comment_sub from './Comment_sub';
import CommentItem from './CommentItem';
import '../index.css';
import axios from 'axios';

export default class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nickname:'',
            // comment_tb : [
            // ],
            user:[
                
            ],
        };

      };
    
    componentDidMount = () => {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        const url = `http://59.29.224.144:10000/users/${userData.id}`;
        axios.get(url)
         .then(response =>{console.log(response)
            this.setState({
                user : response.data
            })
        }) 
          .catch(error => {
            // alert("error")
            console.log(error);
          })
  
          const type = JSON.parse(sessionStorage.getItem('state'));
          if(type==='mentor')this.setState({nickname:this.state.user.mentorNickname})
          else if(type==='mentee')this.setState({nickname:this.state.user.menteeNickname})
      }

    render() {

        return (
            <div >

                <div style={{ height: "45vh", overflowY: 'scroll' }}>
                    {/* <div > &nbsp;&nbsp;&nbsp;{this.props.outputText.trim()} </div>   */}
                    <div style={{ ovpadding: 10, fontSize: 15 }}>{this.props.comment_tb.map((comment, index) => {
                        // console.log(comment.replys)
                        return (<div>
                            {/* <Comment_sub menteeCode={comment.cmtCode}
                                cmt_line_number={comment.cmtLineNumber}
                                content={comment.content}
                                cmtId={comment.cmtId}
                                replys={comment.replys}
                                key={index}
                                handleRemove={this.props.handleRemove}
                                nickname={this.state.nickname}
                            /> */}
                            <CommentItem
                                cmt_line_number={comment.cmtLineNumber}
                                content={comment.content}
                                cmtId={comment.cmtId}
                                replys={comment.replys}
                                key={index}
                                handleRemove={this.props.handleRemove}
                                nickname={this.state.nickname}/>
                            <br />
                        </div>
                        );
                    })
                    }
                    </div>
                </div>
            </div>
        )
    }
}