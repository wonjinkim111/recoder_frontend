import React, { useState, useEffect } from 'react';
import ToolbarBefore from './modules/toolbarBefore';
import ToolbarAfter from './modules/toolbarAfter';
import MentorDashboard from './modules/mentorDashboard';
import FootBar from './modules/footbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Main from './components/main'
import SignIn from './components/signIn'
import SignUp from './components/signUp'
import Mentor from './components/Mentor';
import MentorLogin from './components/MentorLogin';
import Mentee from './components/Mentee';
import RoomList from './components/Room_list';
import Profile from './components/Profile';
import './index.css'

class App extends React.Component {
  data;
  constructor(props){
    super(props);

    this.state={
      rooms:[],
      selectedRoom: null,
      // test:'',
      user:{
        id:'',
        token:''
      },
    }
  }
  // componentWillMount(){
  //   this.data = JSON.parse(localStorage.getItem('user'))
  //   console.log('componentwillmount',this.data);
  //   // this.setState({test: (JSON.parse(localStorage.getItem('user')) === null)?<ToolbarBefore/>:<ToolbarAfter/>})
  //   if(localStorage.getItem('user')){
  //     this.setState({user: this.data})
  //   }
  //   if(this.data)
  //   console.log(this.data);
  // }

  
  render(){
    this.data = JSON.parse(localStorage.getItem('user'))
    //if(localStorage.getItem('user'))this.setState({user:this.data})

  return (
    <React.Fragment>
      <Router>
      {/* {this.state.test} */}
    {/* <ToolbarAfter/> */}
    {this.data ? <ToolbarAfter/> : <ToolbarBefore/>}
    <div className='main'>
      <Route exact path="/" component={Main}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/signup" component={SignUp}/>
      {/* <Route path="/user/mentor" component={Mentor}/> */}
      <Route path="/user/mentor" component={MentorLogin}/>
      <Route path="/mentee" component={Mentee}/>
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
