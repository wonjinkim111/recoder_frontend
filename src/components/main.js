import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Background from '../images/view.jpg';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ProductHeroLayout from '../layout/ProductHeroLayout';

const usestyles = makeStyles((theme)=>({
    background: {
        backgroundImage: `url(${Background})`,
        backgroundColor: '#cc98eb',
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 200,
        margin: 20,
    },
    h2: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
          marginTop: theme.spacing(10),
        },
      },
      more: {
        marginTop: theme.spacing(2),
      },
      rightLink: {
        fontSize: 16,
        color: theme.palette.common.white
      },
}));

export default function Main(props) {
    const classes = usestyles();
    // const [values, setValues] = React.useState({
    //     mentorNickname: '멘토1',
    //     roomName: 'room1',
    //     roomInfo: '멘토입니다.',
    //     roomIsPrivate: 1,
    //     roomMax: 3,
    //     roomPicture : '../images/room.jpg',
    //     roomLanguage : 1
    //   });
    
    //   const room = {
    //       nickname: '',
    //       name: '',
    //       info: '',
    //       isPrivate: '',
    //       max: '',
    //       picture: '',
    //       language: ''
    //   }

    //   const [user] = React.useState(props.location.state);
    //   console.log(user);

      const rooms = [
        {
            nickname: '멘토1',
            name: 'room1',
            info: '멘토입니다.',
            isPrivate: 1,
            max: 2,
            picture: '../images/room.jpg',
            language: 1
        },
        {
            nickname: '멘토2',
            name: 'room2',
            info: '멘토야이ㅑ이',
            isPrivate: 1,
            max: 3,
            picture: '../images/room.jpg',
            language: 1
        },
        {
            nickname: '멘토3',
            name: 'room3',
            info: '나는고수',
            isPrivate: 1,
            max: 4,
            picture: '../images/room2.jpg',
            language: 1
        },
        {
            nickname: '멘토4',
            name: 'room4',
            info: '메렁메렁',
            isPrivate: 1,
            max: 3,
            picture: '../images/room.jpg',
            language: 1
        },
        {
            nickname: '멘토5',
            name: 'room5',
            info: '제발',
            isPrivate: 0,
            max: 6,
            picture: '../images/room2.jpg',
            language: 1
        },
      ]

      const [values] = React.useState({rooms});
      console.log(values.rooms);            //array
      console.log(values);                  //object

        return(
            <ProductHeroLayout backgroundClassName={classes.background}>               
                <img style={{ display: 'none' }} src={Background} alt="mainpage" />
                <Typography color="inherit" align="center" variant="h2" marked="center">
                    누구나 멘토가 될 수 있다!
                </Typography>
                <span><h2>_____</h2></span>
                <div>
                    <Button                    
                    color="secondary"
                    variant="contained"
                    size="large"
                    className={classes.button}>
                    <Link
                    className={classes.rightLink}
                    component={RouterLink} 
                    to={{
                        pathname: "/user/mentor",
                        state: {props}
                    }}
                    underline="none">
                    Mentor
                </Link>
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    className={classes.button}>
                <Link 
                    className={classes.rightLink}
                    component={RouterLink} 
                    to={{
                    pathname : `/roomlist`,
                    // state : {
                    //     nickname : values.mentorNickname,
                    //     name: values.roomName,
                    //     info : values.roomInfo,
                    //     private : values.roomIsPrivate,
                    //     max : values.roomMax,
                    //     picture : values.roomPicture,
                    //     language : values.roomLanguage
                    // }
                    state : {values : values.rooms}
                }}
                    underline="none">
                    Mentee
                </Link>
                </Button>
                </div>
                <Typography variant="body2" color="inherit" className={classes.more} align="center">
                    멘토 또는 멘티로 로그인 하세요. <br/><br/>
                    MENTEE를 누르면 현재 방 리스트를 볼 수 있습니다.
                </Typography>               
            </ProductHeroLayout>
        )
}