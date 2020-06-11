import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../index.css';
import MenteeDashBoard from '../modules/menteeDashboard';
import MenteeReviewList from './MenteeReviewList2';

function MenteeLogin(props){
    return(
        <Router>
            <div className='horizontal'>
            <MenteeDashBoard/>
            <Route path={props.path} component={MenteeReviewList}/>
            </div>
        </Router>
    )
}

export default MenteeLogin;