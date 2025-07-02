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
    console.log("✅ mentorId 전달값:", mentorId);

    if (!mentorId) {
      console.error("❌ mentorId가 없습니다. 데이터를 확인하세요");
      return;
    }

    const url = `http://192.168.45.78:10000/users/mentor/${mentorId}`;
    axios.get(url)
      .then(response => {
        console.log("✅ mentor 상세정보:", response.data);
        this.setState({ user: response.data, open: true });
      })
      .catch(error => {
        console.error("❌ mentor 정보 불러오기 실패:", error);
      });
  };

  clickClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { room } = this.props;

    console.log("✅ room.roomPicture:", room.roomPicture);

    return (
      <Card className={classes.root}>
        <img
          width="100%"
          height="140px"
          src={room.roomPicture || "/default-room.jpg"}
          alt={room.roomName}
        />
        <CardActionArea>
          <Button
            size="large"
            color="primary"
            onClick={this.clickOpen}
            value={room.mentorId} // mentorId를 버튼에 전달
          >
            {room.mentorNickname}
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.clickClose}
            classes={{ paper: classes.dialogPaper }}
          >
            <DialogTitle style={{ backgroundColor: "lightblue" }}>
              <div>
                <Avatar
                  className={classes.large}
                  style={{ float: 'left', marginRight: '1vw' }}
                />
              </div>
              <div>
                {room.mentorNickname}님
                <div>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarHalfIcon />
                </div>
              </div>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body2">
                멘토 소개: {this.state.user.introduction}
              </Typography>
              <Typography variant="body2">
                가입 날짜: {this.state.user.regDate}
              </Typography>
            </DialogContent>
            <DialogContent dividers>
              <Typography variant="body2" color="textSecondary">
                {room.roomInfo}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.clickClose} color="primary">
                확인
              </Button>
              <ReviewReq
                roomid={room.roomId}
                mentorid={room.mentorId}
              />
            </DialogActions>
          </Dialog>
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {room.roomName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
        )
    }
}

export default withStyles(useStyles)(RoomItem);