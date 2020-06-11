import React from 'react';
import ReviewItem from './ReviewItem';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridList from '@material-ui/core/GridList';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
        minWidth: '80vw',
        minHeight: `${window.innerHeight}`,
      },
})

class MenteeReviewList2 extends React.Component{
    constructor(props){
        super(props);

        this.state={
            rooms : [
                {
                    reviewId: 1,
                    roomId: 19,
                    mentorId: 2,
                    menteeId: 4,
                    reviewTitle: "알고리즘 봐주세요",
                    reviewRegDate: "2020-06-03T00:00:00",
                    reviewLanguage: 0,
                    mentorNickname: "고수입니다."
                },
                {
                  reviewId: 1,
                  roomId: 20,
                  mentorId: 3,
                  menteeId: 4,
                  reviewTitle: "알고리즘좀 ..",
                  reviewRegDate: "2020-06-10T00:00:00",
                  reviewLanguage: 0,
                  mentorNickname: "나는야 멘토"
                },
              ]
        }
    }
    
    // componentDidMount(){
    //   const user = JSON.parse(sessionStorage.getItem('user'));
    //   const url = `http://59.29.224.144:20000/room/mentor/${user.mentorid}`;
    //     axios.get(url)
    //      .then(response =>{console.log(response)
    //         this.setState({
    //             rooms : response.data
    //         })

    //     }) 
    //       .catch(error => {
    //         alert(error);
    //       })
    // }



    render(){
        const {classes} = this.props;
            const reviewItems= this.state.rooms.map((r,roomId)=>{
            return (
                <Grid item>
                <ReviewItem room={r} key={roomId}/>
                
                </Grid>
            )
        })

    return(
        <div className={classes.root}>
            
            {/* <Typography aligh="center" variant="h5" gutterBottom={true}><br/>Room list</Typography> */}
        <GridList className={classes.gridList} cellHeight={'auto'} cols={3}> 
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }} />
                <ListSubheader component="div">Review List</ListSubheader>

        {reviewItems}
        
        
        </GridList>
        </div>
    )
}
}

export default withStyles(useStyles)(MenteeReviewList2);