import React from 'react';
import RoomItem from './RoomItem';
import GridList from '@material-ui/core/GridList';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import {css} from '@emotion/core';
import {MoonLoader} from "react-spinners";
import axios from 'axios';
import Paper from '@material-ui/core/Paper';       
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'scroll',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: '80vw',
        height: `${window.innerHeight}`,
      },
})

class RoomList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            loading: true,
            searchContent:"",
            searchTitle:"title",
            rooms2:[],
            rooms : [
                // {
                //     mentorId: 1,
                //     roomId: 1,
                //     mentorNickname: '멘토1',
                //     roomName: 'room1',
                //     roomInfo: '멘토입니다.',
                //     roomIsPrivate: 1,
                //     roomMax: 5,
                //     roomPicture: '../images/room.jpg'
                // },
                // {
                //     mentorId: 2,
                //     roomId: 2,
                //     mentorNickname: '멘토2',
                //     roomName: 'room2',
                //     roomInfo: '멘토야이ㅑ이',
                //     roomIsPrivate: 1,
                //     roomMax: 8,
                //     roomPicture: '../images/room.jpg'
                // },
                // {
                //     mentorId: 3,
                //     roomId: 19,
                //     mentorNickname: '멘토3',
                //     roomName: 'room3',
                //     roomInfo: '점잖은 멘토.',
                //     isPrivate: 1,
                //     roomMax: 5,
                //     roomPicture: '../images/room.jpg'
                // },
                // {
                //     mentorId: 4,
                //     roomId: 20,
                //     mentorNickname: '멘토4',
                //     roomName: 'room4',
                //     roomInfo: '활발한 멘토',
                //     roomIsPrivate: 1,
                //     roomMax: 4,
                //     roomPicture: '../images/room.jpg'
                // },
                // {
                //     mentorId: 5,
                //     roomId: 21,
                //     mentorNickname: '멘토5',
                //     roomName: 'room5',
                //     roomInfo: '웃긴멘토',
                //     roomIsPrivate: 1,
                //     roomMax: 7,
                //     roomPicture: '../images/room.jpg'
                // },
              ]
        }
    }
    
    componentDidMount(){
        const url = 'http://59.29.224.144:20000/room';
        axios.get(url)
         .then(response =>{console.log(response)
            this.setState({
                loading: false,
                rooms : response.data,
                rooms2 : response.data
            })

        }) 
          .catch(error => {
            alert(error);
          })
    }

handleChangeSearch = e =>{
    this.setState({[e.target.name] : e.target.value})

}

    handleSearch = e => {
        //console.log(this.state.rooms)
        //console.log(111+this.state.searchTitle)
        //console.log(222+this.state.searchContent)
        var search = this.state.searchContent;
        e.preventDefault();
        if (this.state.searchTitle === "title") {
            var testData1 = this.state.rooms.filter(function (room) { return room.roomName.indexOf(search) !== -1 })
            this.setState({ rooms2: testData1 })
        }
        else if (this.state.searchTitle === "mentorNickname") {
            var testData2 = this.state.rooms.filter(function (room) { return room.mentorNickname.indexOf(search) !== -1 })
            this.setState({ rooms2: testData2 })
        }
    }


    render(){
        const {classes} = this.props;
            const roomItems= this.state.rooms2.map((r,roomId)=>{
            return (
                <Grid item>
                <RoomItem room={r} key={roomId}/>
                
                </Grid>
            )
        })

    return(
        <div className={classes.root}>
            <div style={{display:'flex'}}>
                <select style={{ position: "relative", height: "8vh", width: "5vw", right: "0.1vw", bottom: '-0vh', borderRadius: '0.3em', marginTop: '3.5vh', marginRight: '1vw' }} name="searchTitle" onChange={this.handleChangeSearch} >
                    <option value="title">제목</option>
                    <option value="mentorNickname">멘토</option>
                </select>
                <Paper component="form" style={{ position: "relative", minWidth: "300", marginTop: '3vh' }} >
                    <InputBase
                        className={classes.input}
                        placeholder="방 검색"
                        inputProps={{ 'aria-label': '방 검색' }}
                        name="searchContent"
                        value={this.state.searchContent}
                        onChange={this.handleChangeSearch}
                    />
                    <IconButton type="submit" onClick={this.handleSearch} className={classes.iconButton} aria-label="search">
                        <SearchIcon style={{ height: "4vh" }} />
                    </IconButton>

                </Paper>
            </div>
            {/* <Typography aligh="center" variant="h5" gutterBottom={true}><br/>Room list</Typography> */}
            <GridList className={classes.gridList} cellHeight={'auto'} cols={3}>

                <GridListTile key="Subheader" cols={2} style={{ height: 'auto'}} />
                {/* <ListSubheader component="div">Room List</ListSubheader> */}
                {this.state.loading? <MoonLoader
                    margin={20}
                    width={100}
                    size={60}
                    color={"#9013FE"}
                    loading={this.state.loading}
                /> :  <ListSubheader component="div">Room List</ListSubheader> }
           
                {roomItems}


            </GridList>
        </div>
    )
}
}

export default withStyles(useStyles)(RoomList);