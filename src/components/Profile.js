import React from 'react';
import Container from '@material-ui/core/Container';
import person from '../images/person.png';
import woman from '../images/woman.png';
import axios from 'axios';
import Button from '@material-ui/core/Button'

class Profile extends React.Component{
    constructor(props){
        super(props);

        this.state={user:[
            // {
            // name:'hersh',
            // email:'hersh@yummy.com',
            // gender:'여성',
            // mentorNickname:'',
            // menteeNickname:'mentee임당'
            // }
        ]}
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
        else return <h2>nickname</h2>;
    }

    getMenteenickname = () => {
        const nickname = this.state.user.menteeNickname;
        if(nickname === null)return <Button>멘티생성</Button>;
        else return <h2>nickname</h2>;
    }

    render(){
        var gender = (this.state.user.gender===0)? "여성":"남성"
        const img = (gender=="여성")?woman : person;
        return(
            // <Container component="main" maxWidth="sm",  >
            <div style={{ backgroundColor:"white",marginTop:'10vh', height: "55vh",width:'80vw', marginLeft:'10vw'}}>
                <div style={{border: '20px solid lightblue', marginTop:'10vh', height:"85%",width:'50vw', marginLeft:'10vw'}}>
                <div style={{border:"1px",float:"left", height:"100%",width:"40%"}}>
                <img src={`${img}`} style={{  margin: '2vw' ,width: "75%", height: '53%' }} alt="profileIMG" />
                <h2 style={{ position:"relative", top:"-10%",    textAlign:"center"}}> {this.state.user.name}</h2>
                </div>
                <div  style={{border:"1px",float:"left", height:"100%",width:"60%"}}>
                <h2>이메일 : {this.state.user.email}</h2>
                    <h2>성별 : {gender}</h2>
                    <h2>멘토 닉네임 : {this.state.user.mentorNickname}</h2>
                    <h2>멘티 닉네임 : {this.state.user.menteeNickname}</h2>
                </div>
                
                </div>
                </div>
        //  </Container >
        )
    }
}

export default Profile;