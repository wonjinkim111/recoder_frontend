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

        // this.state={
        //     nickname: this.props.location.state.nickname,
        //     name : this.props.location.state.name,
        //     info: this.props.location.state.info,
        //     private: this.props.location.state.private,
        //     max : this.props.location.state.max,
        //     picture: this.props.location.state.picture,
        //     language: this.props.location.state.language
        // }
        //this.state={this.props.location.state.values}
    }
    
    render(){
        const {classes} = this.props;
        console.log(this.props.location.state.values);
        const roomItems = this.props.location.state.values.map((r,i)=>{
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