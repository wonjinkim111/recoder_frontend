import React from 'react';
import Container from '@material-ui/core/Container';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import Avatar from '@material-ui/core/Avatar';

class Profile extends React.Component{
    constructor(props){
        super(props);

        // this.state = {
        //     gender:''
        // }
    }
    
//     componentWillMount = () => {
//     if(this.props.locations.state.usergender==0)
//     this.setState({
//         gender:'여성'
//     })
//     else
//     this.setState({
//         gender:'남성'
//     })
//   }

    render(){

        return(
        <Container maxWidth="sm" >
        <div>
            <Avatar>
                <FaceRoundedIcon color="primary" fontSize="large"/>
            </Avatar>
            <h2>이름 : {this.props.location.state.username}</h2>
            <h2>이메일 : {this.props.location.state.useremail}</h2>
            <h2>성별 : {this.props.location.state.usergender}</h2>
            <h2>가입 날짜 : {this.props.location.state.userregdate}</h2>
         </div>
         </Container>
        )
    }
}

export default Profile;