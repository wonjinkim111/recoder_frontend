import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../index.css';
import MentorDashBoard from '../modules/mentorDashboard';
import MenteeList from './MenteeList';
import RoomReviewList from './RoomReviewList';
import MentorRoom from './MentorRoom';

function MentorLogin({match}){
    //console.log(props);

const handleRouter = e =>{
            
}
    return(
        <Router>
        <div className='horizontal'>
        <MentorDashBoard/>
         <Route exact path={`${match.path}/:id`} component={MenteeList}/>
         <Route path={`${match.path}/reviewlist/:id`} component={RoomReviewList}/>
        <Route path={`${match.path}/setting/:id`} component={MentorRoom}/> 
        </div>
        </Router>
 
    )
}

export default MentorLogin;