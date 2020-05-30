import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
      maxWidth: 345,
      margin: 20
    },
    media: {
      height: 140,
    },
  });

class RoomItem extends React.Component {
    constructor(props){
        super(props);
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
                    // image={require`('${this.props.room.picture}')`}
                    title="room image" />
                <Button size="large" color="primary">
                        {this.props.room.nickname}
                </Button>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.room.info}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
}

export default withStyles(useStyles)(RoomItem);