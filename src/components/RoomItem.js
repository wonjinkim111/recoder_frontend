import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Avatar from '@material-ui/core/Avatar';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import ReviewReq from './reviewReq';
import axios from 'axios';




const useStyles = theme => ({
    root: {
        maxWidth: 400,
        margin: 20,
    },
    media: {
        height: 140,
    },
    dialogPaper: {
        minHeight: 200,
        maxHeight: 200,
        minWidth: 300,
        maxHeight: 300
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
});

class RoomItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            setOpen: false,
            open: false,
            previewURL: '',
        }
    }

    clickOpen = (e) => {
  const mentorId = e.currentTarget.value;
  console.log("mentorId 전달값:", mentorId);  // 이게 undefined가 나오면 value 전달 문제!
  if (!mentorId) {
    alert("mentorId가 없습니다. 데이터를 확인하세요.");
    return;
  }
  const url = `http://192.168.45.40:10000/users/mentor/${mentorId}`;
  axios.get(url)
    .then(response => {
      console.log(response);
      this.setState({ user: response.data, open: true });
    })
    .catch(err => {
      console.error(err);
      alert("멘토 정보를 불러오지 못했습니다.");
            })
    }
    clickClose = () => {
        this.setState({ open: false })
    }


    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.root}>
                {console.log(this.props.room.roomPicture)}
                {/* <input type="file" accept="image/*" file={this.props.room.roomPicture} onChange={this.handleFileInput}/> */}
                <img id="test" width="100%" height="140px" src={this.props.room.roomPicture} />
                <CardActionArea onClick={this.clickOpen}>
                    {/* <CardMedia
                    className={classes.media}
                    image = {require('../images/room.jpg')}
                    // image = {require(this.props.room.picture)}
                    title="room image" /> */}

                    <Typography variant="h6" style={{padding: '10px', color: 'blue', textAlign: 'center'}}>
                        {this.props.room.mentorNickname}
                    </Typography>
                    <Dialog open={this.state.open} onClose={this.clickClose} classes={{ paper: classes.dialogPaper }}>
                        <DialogTitle id="customized-dialog-title" style={{ backgroundColor: "lightblue" }}>
                            <div>
                                <Avatar className={classes.large} style={{ float: 'left', marginRight: '1vw', }} />
                            </div>
                            <div>
                                {this.props.room.mentorNickname}님
                    <div style={{ float: 'down' }}>
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarHalfIcon />
                                </div>
                            </div>
                        </DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="body2" component="p">
                                멘토 소개 : {this.state.user.introduction}
                            </Typography>
                            <Typography variant="body2" component="p">
                                가입 날짜 : {this.state.user.regDate}
                            </Typography>
                        </DialogContent>
                        <DialogContent dividers>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.props.room.roomInfo}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={this.clickClose} color="primary" style={{ float: 'left' }}>
                                확인
                    </Button>
                            <ReviewReq roomid={this.props.room.roomId} mentorid={this.props.room.mentorId} />
                        </DialogActions>
                    </Dialog>
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