import React from 'react';
import '../index.css';
import MentorDashBoard from '../modules/mentorDashboard';

function MentorLogin(props){
    console.log(props);
    return(
        <div className='horizontal'>
        <MentorDashBoard user={props}/>
        <h1>Mentor Login 화면 입니다~! </h1>
        </div>
    )
}

export default MentorLogin;