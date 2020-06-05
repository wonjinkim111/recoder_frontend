import React from 'react';
import Container from '@material-ui/core/Container';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';

class Profile extends React.Component{
    constructor(props){
        super(props);

        this.state={user:[]}
    }

    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem('user'));
        const url = `http://59.29.224.144:10000/users/${userData.id}`;
        axios.get(url)
         .then(response =>{console.log(response)
            this.setState({
                user : response.data
            })

        }) 
          .catch(error => {
            // alert("error")
            console.log(error);
          })
    }

    render(){
        var gender = (this.state.user.gender===0)? "여성":"남성"
        
        return(
        <Container maxWidth="sm" >
        <div>
            <Avatar>
                <FaceRoundedIcon color="primary" fontSize="large"/>
            </Avatar>
            <h2>이름 : {this.state.user.name}</h2>
            <h2>이메일 : {this.state.user.email}</h2>
            <h2>성별 : {gender}</h2>
         </div>
         </Container>
        )
    }
}

export default Profile;