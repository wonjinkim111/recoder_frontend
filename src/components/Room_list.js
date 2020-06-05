import React from 'react';
import RoomItem from './RoomItem';
import GridList from '@material-ui/core/GridList';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

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
        }
    }
    
    render(){
        const {classes} = this.props;
            const roomItems= this.state.rooms.map((r,i)=>{
            return (
                <Grid item>
                <RoomItem room={r} key={i}/>
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