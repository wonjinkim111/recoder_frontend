import React from 'react';
import RoomItem from './RoomItem';
import GridList from '@material-ui/core/GridList';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'scroll',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: `${window.innerWidth}`,
        height: `${window.innerHeight}`,
      },
})

class RoomList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            rooms : [
                // {
                //     mentorNickname: '멘토1',
                //     roomName: 'room1',
                //     roomInfo: '멘토입니다.',
                //     isPrivate: 1,
                //     max: 5,
                //     picture: '../images/room.jpg',
                //     language: 1
                // },
                // {
                //     mentorNickname: '멘토2',
                //     roomName: 'room2',
                //     roomInfo: '멘토야이ㅑ이',
                //     isPrivate: 1,
                //     max: 8,
                //     picture: '../images/room.jpg',
                //     language: 2
                // },
                // {
                //     mentorNickname: '멘토3',
                //     roomName: 'room3',
                //     roomInfo: '점잖은 멘토.',
                //     isPrivate: 1,
                //     max: 5,
                //     picture: '../images/room.jpg',
                //     language: 1
                // },
                // {
                //     mentorNickname: '멘토4',
                //     roomName: 'room4',
                //     roomInfo: '활발한 멘토',
                //     isPrivate: 1,
                //     max: 4,
                //     picture: '../images/room.jpg',
                //     language: 3
                // },
                // {
                //     mentorNickname: '멘토5',
                //     roomName: 'room5',
                //     roomInfo: '웃긴멘토',
                //     isPrivate: 1,
                //     max: 7,
                //     picture: '../images/room.jpg',
                //     language: 2
                // },
                
              ]
        }
    }
    
    componentDidMount(){
        const url = 'http://59.29.224.144:20000/room';
        axios.get(url)
         .then(response =>{console.log(response)
            this.setState({
                rooms : response.data
            })

        }) 
          .catch(error => {
            alert(error);
          })
    }



    render(){
        const {classes} = this.props;
            const roomItems= this.state.rooms.map((r,roomId)=>{
            return (
                <Grid item>
                <RoomItem room={r} key={roomId}/>
                
                </Grid>
            )
        })

    return(
        <div className={classes.root}>
            
            {/* <Typography aligh="center" variant="h5" gutterBottom={true}><br/>Room list</Typography> */}
        <GridList className={classes.gridList} cellHeight={'auto'} cols={3}> 
        {/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}> */}
        <ListSubheader component="div">Room List</ListSubheader>

        {roomItems}
        
        
        </GridList>
        </div>
    )
}
}

export default withStyles(useStyles)(RoomList);