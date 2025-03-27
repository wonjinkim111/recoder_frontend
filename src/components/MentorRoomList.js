import React, {useEffect} from 'react';
import { Link, Route, BrowserRouter as Router } from "react-router-dom"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import RoomCreate from './RoomCreate';
import Button from '@material-ui/core/Button';
import ReviewReq from './reviewReq';
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
  c: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(1,'테스트방1', 5, ),
  createData(2,'테스트방2', 7, ), 
];

const useStyles = makeStyles({
  table: {
    position:"relative",
    minWidth: 700,
    width: "80vw",
    left : "10vw",

  },
  container: {
    maxHeight: 440,
  },
  button :{
    position : "relative",
    bottom: "5%",
    height: "100%",
    width:"5vw",
    left: "0.5%",
    fontSize: "20px",
    borderRadius:"0.3em",
    border:"1px solid gray",
    color:"white",
    backgroundColor: "white",
    fontWeight : "bold",
  }
});

export default function MentorRoomList(props) {
  const classes = useStyles();

  const [mentorRoom, setMentorRoom] = React.useState([]);

  const handleEnter = e => {
    //console.log(e.target.value)
    // window.location.href=`/mentordashboard?mentorRoomid=${e.target.value}`;
    // props.history.push({
    //   pathname: `/mentordashboard/${roomId}`
    window.location.href=`/mentordashboard/${e.currentTarget.value}`
  }

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log(user);
    const url = `http://192.168.45.134:32246/room/mentor/${user.mentorid}`;
    axios.get(url)
    .then(response =>{console.log(response)
        setMentorRoom(response.data)
    }) 
      .catch(error => {
        // alert("error")
        console.log(error);
      })


  }, []);


  return (
    // <Container>
    <div>
      {/* <div style={{position:"relative", left:"80vw"}}> */}
    <RoomCreate />
      {/* </div> */}
    <TableContainer className={classes.container}>
      <Table stickyHeader className={classes.table} aria-label="customized table" >
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell align="center">이름</StyledTableCell>
            <StyledTableCell align="center">인원</StyledTableCell>
            <StyledTableCell align="center">입장</StyledTableCell>
            

          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row,index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.calories}</StyledTableCell>
              <StyledTableCell align="center">{row.fat}</StyledTableCell>
              <StyledTableCell align="center">
                  <Link to={`/mentordashboard?roomId=${row.name}`}>
                <Button value={row.name} onClick={handleEnter} variant="contained" color="primary" >입장</Button>
                </Link>
              </StyledTableCell>
  
            </StyledTableRow>
          ))} */}
            {mentorRoom.map((list, index) => (
              <StyledTableRow key={list.roomId}>
                <StyledTableCell component="th" scope="row">{index + 1} {/*or {list.roomId}*/}</StyledTableCell>
                <StyledTableCell align="center">{list.roomName}</StyledTableCell>
                <StyledTableCell align="center">{list.roomMax}</StyledTableCell>
                <StyledTableCell align="center" >
                    <Button id ="getRoomId" value={list.roomId} onClick={handleEnter} style={{backgroundColor: '#3E007C', color:'#fff'}}>입장</Button>
                    
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
      </Table>
    </TableContainer>
    </div>
    // </Container>
  );
}