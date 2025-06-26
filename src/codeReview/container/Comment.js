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
    //     const userData = JSON.parse(sessionStorage.getItem('user'));
    //     const url = `http://192.168.45.241:10000/users/${userData.id}`;
    //     axios.get(url)
    //      .then(response =>{console.log(response)
    //         this.setState({
    //             user : response.data
    //         })
    //     }) 
    //       .catch(error => {
    //         // alert("error")
    //         console.log(error);
    //       })
  
      }

    render() {

        return (
            <div >
                    {console.log(this.props.comment_tb)}
                <div style={{ height: "45vh", overflowX: "hidden",overflow: 'hidden' }}>
                    {/* <div > &nbsp;&nbsp;&nbsp;{this.props.outputText.trim()} </div>   */}
                    <div style={{ ovpadding: 10, fontSize: 15 }}>{this.props.comment_tb.map((comment, index) => {
                        // console.log(comment.replys)
                        return (<div>
                           <CommentItem
                                cmt_line_number={comment.cmtLineNumber}
                                content={comment.content}
                                menteeCode={comment.cmtCode}
                                cmtId={comment.cmtId}
                                replys={comment.replys}
                                key={index}
                                handleRemove={this.props.handleRemove}
                                nickname={this.state.nickname}/>
                         
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