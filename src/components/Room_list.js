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
                }
              ]
        }
    }
    
    componentDidMount(){
        const url = 'http://59.29.224.144:20000/recoder/room';
        axios.get(url)
         .then(response =>{console.log(response)
            this.setState({
                rooms : response.data
            })

        }) 
          .catch(error => {
            alert("error")
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