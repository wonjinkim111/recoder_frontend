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
  head: {
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
  createData(1,'테스트방1', 159, ),
  createData(2,'테스트방2', 237, ),
 
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function MenteeReviewList() {
  const classes = useStyles();

  const [mentorRoom, setMentorRoom] = React.useState({});

  const handleEnter = e => {
    
  }


//   useEffect(() => {

//     const user = JSON.parse(sessionStorage.getItem('user'));
//     const url = `http://192.168.45.20745.207:10000/recoder/room/mentor/${user.mentorid}`;
//     axios.get(url)
//     .then(response =>{console.log(response)
//         this.setState({
//             mentorRoom : response.data
//         })

//     }) 
//       .catch(error => {
//         // alert("error")
//         console.log(error);
//       })


//   }, []);

  return (
    <Container>
      <div style={{height:"10vh"}}/>
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell align="center">제목</StyledTableCell>
            <StyledTableCell align="center">멘토</StyledTableCell>
            <StyledTableCell align="center">커멘트</StyledTableCell>
            

          </TableRow>
        </TableHead>
        <TableBody style={{width:"10ww"}}>
          {rows.map((row,index) => (
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
          ))}
        {/* {mentorRoom.map((list,index)=>(
                <StyledTableRow key={list.roomId}>
                    <StyledTableCell component="th" scope="row">{index+1} or {list.roomId}</StyledTableCell>
                    <StyledTableCell align="center">{list.roomName}</StyledTableCell>
                    <StyledTableCell align="center">{list.roomMax}</StyledTableCell>
                    <StyledTableCell align="center" value={}onClick={this.handleEnter}>
                        <Link to={`/mentordashboard?roomId=${list.roomId}`}>
                        <button>입장</button>
                        </Link>
                    </StyledTableCell>
                </StyledTableRow>
            ))} */}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}
