import React, { Component } from 'react'
import Comment_sub from './Comment_sub';
import '../index.css';
export default class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comment_tb : [
            ]
        };

      };


    render() {

        return (
            <div >

                              
                <div  style={{ height:"47vh",overflowY: 'scroll'}}>
                        {/* <div > &nbsp;&nbsp;&nbsp;{this.props.outputText.trim()} </div>   */}
                        <div style={{  ovpadding:10,fontSize:15}}>{this.props.comment_tb.map((comment, index) =>{ 
                                // console.log(comment.replys)
                                return (<div>
                                    <Comment_sub menteeCode={comment.cmtCode}
                                                 cmt_line_number={comment.cmtLineNumber} 
                                                 content={comment.content}
                                                 cmtId = {comment.cmtId}
                                                 replys={comment.replys}
                                                 key={index}
                                                 handleRemove={this.props.handleRemove}
                                    />
                                    <br/>
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