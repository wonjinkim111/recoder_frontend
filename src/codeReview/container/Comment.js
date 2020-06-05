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

                              
                <div  style={{ height:"45vh",overflowY: 'scroll'}}>
                        {/* <div > &nbsp;&nbsp;&nbsp;{this.props.outputText.trim()} </div>   */}
                        <div style={{  ovpadding:10,fontSize:15}}>{this.props.comment_tb.map((comment, index) =>{ 
                                return (<div>
                                    <Comment_sub menteeCode={comment.menteeCode}
                                                 cmt_line_number={comment.cmt_line_number} 
                                                 content={comment.content} 
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