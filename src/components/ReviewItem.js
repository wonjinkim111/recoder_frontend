import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Avatar from '@material-ui/core/Avatar';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = theme => ({
    root: {
        maxWidth: 400,
        margin: 20,
    },
    media: {
        height: 140,
    },
    dialogPaper:{
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

class ReviewItem extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            setOpen:false,
            open: false,
            language: ''
        }
    }

    clickOpen = () => {
        this.setState({open : true});
        if(this.props.review.reviewLanguage === 0)this.setState({language:'Java'});
        else if(this.props.review.reviewLanguage === 1) this.setState({language: 'C'});
        else if(this.props.review.reviewLanguage === 2) this.setState({language: 'Cpp'});
        else this.setState({language: '기타'});
      }
    clickClose = () => {
        this.setState({open : false})
      }
    clickEnter = () => {
        //코드리뷰 페이지 이동
        window.location.href=`/review/${this.props.review.reviewId}`;
      }
      
    render(){
        const {classes} = this.props;

    return (
        <Card className={classes.root}>
            
            <CardActionArea >
                <CardMedia
                    className={classes.media}
                    image = {require('../images/review.png')}
                    // image = {require(this.props.room.picture)}
                    title="room image" />
                    
                <Button size="large" color="primary" onClick={this.clickOpen}>{this.props.review.mentorNickname}</Button>
                <Dialog open={this.state.open} onClose={this.clickClose} classes={{paper:classes.dialogPaper}}>
                <DialogTitle id="customized-dialog-title" style={{backgroundColor:"lightblue"}}>
                    <div>
                    <Avatar className={classes.large} style={{float:'left', marginRight:'1vw',}}/>
                    </div>
                    <div>
                    {this.props.review.mentorNickname}님
                    <div style={{float:'down'}}>
                    <StarIcon/>
                    <StarIcon/>
                    <StarIcon/>
                    <StarIcon/>
                    <StarHalfIcon/>
                    </div>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                <Typography variant="body2" color="textSecondary" component="p">
                    리뷰 요청 시간 : {this.props.review.reviewRegDate}<br/>
                    리뷰 요청 언어 : {this.state.language}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.clickClose} color="primary" style={{float:'left'}}>
                        확인
                    </Button>
                    </DialogActions>
                </Dialog>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.review.reviewTitle}

                        <ExitToAppIcon style={{float:'right', color:'#000066'}} onClick={this.clickEnter}/>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
}

export default withStyles(useStyles)(ReviewItem);