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
//search
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


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

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 5,
    },
    table: {
        minWidth: 700,
      },
  }));

function createData(name, reviewTitle, reviewNickname) {
  return { name, reviewTitle, reviewNickname};
}

const rows = [
  createData(1,'도와주세요', "17"),
  createData(2,'ㅠㅠ제발좀', "31"),
  createData(3,"감사합니다~", "19"),
  createData(4,'일주일째 못 풀고있어요..', "18"),
];

const languages = ['java','c','c++','기타']


export default function RoomReviewList(props) {
  const classes = useStyles();

  const [reviewList, setreviewList] = React.useState([]);
  const [reviewList2, setreviewList2] = React.useState([]);
  const [testData1, setTestData1] = React.useState(rows);

  useEffect(() => {
    //const roomid = document.location.href.split("?");
    //console.log(props.match.params.id);
    console.log(props.match.params.id);
    const url = `http://192.168.45.231:31920/codereview/list/${props.match.params.id}`;
    axios.get(url)
    .then(response =>{console.log(response)
        setreviewList(response.data);
        setreviewList2(response.data);
    }) 
      .catch(error => {
        // alert("error")
        console.log(error);
      })
  },[]);

    const handleSearch= e =>{
      console.log(reviewList)
        //console.log(rows)
        console.log(search.searchTitle)
        console.log(search.searchContent)
        console.log(rows)
        e.preventDefault();
        if(search.searchTitle === "title"){
          var testData1 = reviewList.filter(function(row){return row.reviewTitle.indexOf(search.searchContent) !== -1})
          setreviewList2(testData1)
        }
        else if (search.searchTitle ==="mentee"){
          var testData2 = reviewList.filter(function(row){return row.menteeNickname.indexOf(search.searchContent) !== -1})
          setreviewList2(testData2)
        }
    }

    const [search, setSearch] = React.useState({
        searchContent:"",
        searchTitle:"title",
    });
    const handleChangeSearch = e =>{
        setSearch({...search,[e.target.name] : e.target.value})

    }
    const handleEnter = (e)=> {
      //var  targetValue = document.getElementById("getReviewId").value
        window.location.href=`/review/${e.currentTarget.value}`
    }

  return (
     <div>
      {/* <div style={{ height: "10vh" }} /> */}
      <Container>
        <Paper component="form" style={{ position: "relative", minWidth: "300", float: "right" , marginTop:'3vh'}} className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="리뷰검색"
            inputProps={{ 'aria-label': '리뷰검색' }}
            name="searchContent"
            value={search.searchContent}
            onChange={handleChangeSearch}
          />
          <IconButton type="submit" onClick={handleSearch} className={classes.iconButton} aria-label="search">
            <SearchIcon style={{ height: "4vh" }} />
          </IconButton>

        </Paper>


        <select style={{ position: "relative", height: "6vh", width: "5vw", float: "right", right: "0.1vw", bottom: '-0vh', borderRadius: '0.3em', marginTop:'3vh' }} name="searchTitle" onChange={handleChangeSearch} >
          <option value="title">제목</option>
          <option value="mentee">멘티</option>
        </select>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No.</StyledTableCell>
                <StyledTableCell align="center">제목</StyledTableCell>
                <StyledTableCell align="center">멘티</StyledTableCell>
                <StyledTableCell align="center">언어</StyledTableCell>
                <StyledTableCell align="center">입장</StyledTableCell>


              </TableRow>
            </TableHead>

            <TableBody style={{ width: "10ww" }}>
              {/* {testData1.map((row, index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.reviewTitle}</StyledTableCell>
                  <StyledTableCell align="center">{row.reviewNickname}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Link to={`/mentordashboard/${row.name}`}>
                      <Button value={row.name} variant="contained" color="primary" >입장</Button>
                    </Link>
                  </StyledTableCell>

                </StyledTableRow>
              ))} */}
              {reviewList2.map((list, index) => (
                <StyledTableRow key={list.roomId}>
                  <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                  <StyledTableCell align="center">{list.reviewTitle}</StyledTableCell>
                  <StyledTableCell align="center">{list.menteeNickname}</StyledTableCell>
                  <StyledTableCell align="center">{languages[list.reviewLanguage]}</StyledTableCell>
                  <StyledTableCell align="center">
                  <Button id ="getReviewId" value={list.reviewId} onClick={handleEnter} style={{backgroundColor: '#3E007C', color:'#fff'}}>입장</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
