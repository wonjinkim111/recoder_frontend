import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../index.css';
import MentorDashBoard from '../modules/mentorDashboard';
import MenteeList from './MenteeList';
import RoomReviewList from './RoomReviewList';

function MentorLogin(props){
    //console.log(props);

const handleRouter = e =>{
            
}
    return(
 
        <Router>
        <div className='horizontal'>
        <MentorDashBoard/>
        {/* <MenteeList></MenteeList> */}
        <Route exact path={this.props.path} component={MenteeList}/>
        <Route path={`${this.props.path}/roomreviewlist`} component={RoomReviewList}/>
        </div>
        </Router>
 
    )
}

export default MentorLogin;