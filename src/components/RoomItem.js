import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import CardActions from '@material-ui/core/CardActions';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import ReviewReq from './reviewReq';

const useStyles = theme => ({
    root: {
        maxWidth: 400,
    },
    media: {
        height: 140,
    },
  });

class RoomItem extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            setOpen:false,
            open: false
        }
    }

    clickOpen = () => {
        this.setState({open : true})
        
        console.log(this.state.open)
      }
    clickClose = () => {
        this.setState({open : false})
      }
      
    render(){
        const {classes} = this.props;
        //console.log("룸아이템에서", this.props.room);

    return (
        <Card className={classes.root}>
            
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image = {require('../images/room.jpg')}
                    // image = {require(this.props.room.picture)}
                    title="room image" />
                    
    <Button size="large" color="primary" onClick={this.clickOpen}>{this.props.room.mentorNickname}</Button>
                <Dialog open={this.state.open} onClose={this.clickClose}>
                
                <Typography variant="body2" color="textSecondary" component="p">
                    {this.props.room.roomInfo}
                    </Typography>
                    <ReviewReq></ReviewReq>
             </Dialog>
             <ReviewReq></ReviewReq>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.room.roomName}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
}

export default withStyles(useStyles)(RoomItem);