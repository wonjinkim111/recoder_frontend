import React from 'react';
import axios from 'axios';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import MenteeItem from './MenteeItem';


const useStyles = theme => ({
    root:{
        display:'flex',
        flexWrap:'wrap',
        justifyContent: 'space-around',
        overflow: 'scroll',
        backgroundColor: theme.palette.common.paper
    },
    head: {
        backgroundColor: theme.palette.common.black
      },
    content: {
        color: theme.palette.common.white,
        justifyContent: 'space-around'
    }
})
class MenteeList extends React.Component{
    constructor(props,){
        super(props);

        this.state={
            roomLanguage: '',
            mentees:[
                // {
                //     menteeId: "45",
                //     roomId : "19",
                //     menteeNickname: "마우스",
                //     reviewCount: "3",
                //     language: 1
                // },
                // {
                //     menteeId: "47",
                //     roomId : "19",
                //     menteeNickname: "아메리카노",
                //     reviewCount: "1",
                //     language: 2
                // },
                
            ]
        }
    }

    componentDidMount(){
        //const roomId = this.props.roomid;
        //const getUrl = document.location.href.split("?");
        //const roomId = getUrl[1].split("=");
        //console.log(getUrl);
        //console.log(roomId);
       //const url = `http://192.168.45.207:10000/users/mentor/mentees/19`;
       //console.log(this.props.match.params);
       const url = `http://192.168.45.207:10000/users/mentor/mentees/${this.props.match.params.id}`;
        axios.get(url)
            .then(response=>{
                console.log(response);
                this.setState({mentees : response.data})
            })
            .catch(error => console.log(error)
            )
    }

    render(){
        const {classes} = this.props;
        const menteeItems = this.state.mentees.map((m, i) => {
            return(
                    <MenteeItem  mentee={m} no={i} key={i}/>
            )
        })

        return(
            <div >
                <div style={{height:"10vh"}}/>
            <TableContainer style={{position:"relative", height:"65vh",left:"5vw",width:"70vw"}}component={Paper}>
                <Table>
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell className={classes.content} >No.</TableCell>
                            <TableCell className={classes.content}>nickname</TableCell>
                            <TableCell className={classes.content}>Review Count</TableCell>
                            <TableCell className={classes.content}>Language</TableCell>
                            <TableCell className={classes.content}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;out</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {menteeItems}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        )
    }
}

export default withStyles(useStyles)(MenteeList);