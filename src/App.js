import React, { useState, useEffect } from 'react';
import ToolbarBefore from './modules/toolbarBefore'
import FootBar from './modules/footbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Main from './components/main'
import SignIn from './components/signIn'
import SignUp from './components/signUp'
import MentorLogin from './components/MentorLogin';
import MenteeLogin from './components/MenteeLogin';
import axios from 'axios';
const API_URL = 'http://jsonplaceholder.typicode.com';


function App() {
  // const [user, setuser]=React.useState();
  // useEffect(() => {
  //   const url = `${API_URL}/users`;
  //   axios.get(url).then(response => response.data)
  //   .then((data) => {
  //     setuser({user:data})
  //     //console.log(user);
  //   })
  // })

  return (
    <React.Fragment>
      <Router>
    <ToolbarBefore/>
    <div>
      <Route exact path="/" component={Main}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/user/mentor" component={MentorLogin}/>
      <Route path="/mentee" component={MenteeLogin}/>
    </div> 
    <FootBar/>
    </Router>
    </React.Fragment>
  );
}

export default App;
