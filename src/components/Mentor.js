import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../index.css';
import MentorDashBoard from '../modules/mentorDashboard';
import MenteeList from './MenteeList';
import RoomReviewList from './RoomReviewList';
import MentorRoom from './MentorRoom';

function MentorLogin(props){
    //console.log(props);

const handleRouter = e =>{
            
}
    return(
 
        <Router>
        <div className='horizontal'>
        <MentorDashBoard/>
        {/* <Route exact path={props.path} component={MenteeList}/>
        <Route path={`${props.path}/roomreviewlist`} component={RoomReviewList}/>
        <Route path={`${props.path}/setting`} component={MentorRoom}/> */}
        {/* <Route exact path={props.path} component={RoomReviewList}/> */}
        <Route exact path={props.path} component={MentorRoom}/> 
        </div>
        </Router>
 
    )
}

export default MentorLogin;