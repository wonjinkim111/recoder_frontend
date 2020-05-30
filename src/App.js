import React, { useState, useEffect } from 'react';
import ToolbarBefore from './modules/toolbarBefore'
import ToolbarAfter from './modules/toolbarAfter'
import FootBar from './modules/footbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Main from './components/main'
import SignIn from './components/signIn'
import SignUp from './components/signUp'
import MentorLogin from './components/MentorLogin';
import MenteeLogin from './components/MenteeLogin';
import RoomList from './components/Room_list';
import Profile from './components/Profile';


class App extends React.Component {
  constructor(props){
    super(props);

    this.state={
      rooms:[],
      selectedRoom: null
    }
  }

  render(){
  return (
    <React.Fragment>
      <Router>
    {/* <ToolbarBefore/> */}
    <ToolbarAfter/>
    <div>
      <Route exact path="/" component={Main}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/user/mentor" component={MentorLogin}/>
      <Route path="/mentee" component={MenteeLogin}/>
      <Route path="/roomlist" component={RoomList}/>
      <Route path="/profile" component={Profile}/>
    </div> 
    <FootBar/>
    </Router>
    </React.Fragment>
  );
}
}

export default App;
