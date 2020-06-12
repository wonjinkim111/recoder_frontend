import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../index.css';
import MenteeDashBoard from '../modules/menteeDashboard';
import MenteeReviewList from './MenteeReviewList2';
import Room_list from './Room_list';

function MenteeLogin({match}){
    return(
        <Router>
            <div className='horizontal'>
            <MenteeDashBoard/>
            <Route path={`${match.path}/roomlist`} component={Room_list}/>
            <Route path={`${match.path}/reviewlist`} component={MenteeReviewList}/>
            </div>
        </Router>
    )
}

export default MenteeLogin;