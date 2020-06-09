import React from 'react';
import Container from '@material-ui/core/Container';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import Button from '@material-ui/core/Button'

class Profile extends React.Component{
    constructor(props){
        super(props);

        this.state={user:[]}
    }

    componentDidMount(){
        const userData = JSON.parse(sessionStorage.getItem('user'));
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

    getMentornickname = () => {
        const nickname = this.state.user.mentorNickname;
        if(nickname === null)return <Button>멘토생성</Button>;
        else return nickname;
    }

    getMenteenickname = () => {
        const nickname = this.state.user.menteeNickname;
        if(nickname === null)return <Button>멘티생성</Button>;
        else return nickname;
    }

    render(){
        var gender = (this.state.user.gender===0)? "여성":"남성"
        
        return(
        <Container component="main" maxWidth="sm" >
            <div style={{height:"10vh"}}></div>
        <div>
            <Avatar>
                <FaceRoundedIcon color="primary" fontSize="large"/>
            </Avatar>
            <h2>이름 : {this.state.user.name}</h2>
            <h2>이메일 : {this.state.user.email}</h2>
            <h2>성별 : {gender}</h2>
            <h2>멘토 닉네임 : {this.state.user.mentorNickname}</h2>
            <h2>멘티 닉네임 : {this.getMenteenickname}</h2>
         </div>
         </Container>
        )
    }
}

export default Profile;