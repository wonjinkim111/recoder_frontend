import React, { useState, useEffect } from 'react';
import ToolbarBefore from './modules/toolbarBefore';
import ToolbarAfter from './modules/toolbarAfter';
import FootBar from './modules/footbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Main from './components/main'
import SignIn from './components/signIn'
import SignUp from './components/signUp'
import Mentor from './components/Mentor';
import MentorLogin from './components/MentorLogin';
import MenteeLogin from './components/MenteeLogin';
import MentorRoomList from './components/MentorRoomList';
import Mentee from './components/Mentee';
import RoomList from './components/Room_list';
import Profile from './components/Profile';
import Review from './codeReview/index';
import Item from './components/MenteeItem';
import MenteeList from './components/MenteeList';
import MentorRoom from './components/MentorRoom';
import NotFound from './components/NotFound';
import RoomCreate from './components/RoomCreate';
import MenteeReviewList from './components/MenteeReviewList';
import RoomReviewList from './components/RoomReviewList';
import ReviewReq from './components/reviewReq';
import './index.css';

class App extends React.Component {
  data;
  constructor(props){
    super(props);

    this.state={
      login_flag: false,
      rooms:[],
      selectedRoom: null,
      // test:'',
      user:{
        id:'',
        token:''
      },
    }
  }
  
  render(){
    this.data = JSON.parse(sessionStorage.getItem('user'))
    //if(sessionStorage.getItem('user'))this.setState({user:this.data})

  return (
    <React.Fragment>
      <Router>
    {/* <ToolbarAfter/> */}
    {this.data ? <ToolbarAfter/> : <ToolbarBefore/>}
    <div className='main'>
    
      <Route exact path="/" component={Main}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/mentordashboard" component={Mentor}/>
      <Route path="/menteedashboard" component={Mentee}/>
      <Route path="/mentorlogin" component={MentorLogin}/>
      <Route path="/menteelogin" component={MenteeLogin}/>
      <Route path="/mentor/roomlist" component={MentorRoomList}/>
      <Route path="/mentee" component={Mentee}/>
      <Route path="/roomlist" component={RoomList}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/review" component={Review}/>
      <Route path="/item" component={Item}/>
      {/* <Route path="/menteelist" component={MenteeList}/> */}
      <Route path="/mentorRoom" component={MentorRoom}/>
      {/* <Route path="/reviewreq" component={ReviewReq}/> */}
      <Route path="/roomCreate" component={RoomCreate}/>
      <Route path="/reviewlist" component={MenteeReviewList}/>
      <Route path="/roomreviewlist" component={RoomReviewList}/>
      {/* <Route component={NotFound}/> */}
    </div>
    <div style={{position:"absolute", height:"30%",width:"100vw",bottom:"-30%" }}>
    <FootBar />
    </div>
    </Router>
    </React.Fragment>

  );
}
}

export default App;
