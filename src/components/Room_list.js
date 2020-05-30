import React from 'react';
import RoomItem from './RoomItem';
import GridList from '@material-ui/core/GridList';
import {withStyles} from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: 800,
        height: 500,
      },
})

class RoomList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            nickname: this.props.location.state.nickname,
            name : this.props.location.state.name,
            info: this.props.location.state.info,
            private: this.props.location.state.private,
            max : this.props.location.state.max,
            picture: this.props.location.state.picture,
            language: this.props.location.state.language
        }
    }
    
    render(){
        const {classes} = this.props;
        console.log(this.state);
        //console.log(this.props);
        // const roomItems = this.props.rooms.map(r=>{
        //     return (
        //         <RoomItem room={r}/>
        //     )
        // })

    return(
        <div className={classes.root}>
        <GridList className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Room List</ListSubheader>
            {/* {roomItems} */}
            <RoomItem room={this.state}/>
            <RoomItem room={this.state}/>
            <RoomItem room={this.state}/>
            <RoomItem room={this.state}/>
            <RoomItem room={this.state}/>
            </GridListTile>
        </GridList>
        </div>
    )
}
}

export default withStyles(useStyles)(RoomList);