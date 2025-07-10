import React from 'react';
import ReviewItem from './ReviewItem';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridList from '@material-ui/core/GridList';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {css} from '@emotion/core';
import {MoonLoader} from "react-spinners";
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
            loading: true,
            reviews : [
                // {
                //     reviewId: 1,
                //     roomId: 19,
                //     mentorId: 2,
                //     menteeId: 4,
                //     reviewTitle: "알고리즘 봐주세요",
                //     reviewRegDate: "2020-06-03T00:00:00",
                //     reviewLanguage: 0,
                //     mentorNickname: "고수입니다."
                // },
                // {
                //   reviewId: 1,
                //   roomId: 20,
                //   mentorId: 3,
                //   menteeId: 4,
                //   reviewTitle: "알고리즘좀 ..",
                //   reviewRegDate: "2020-06-10T00:00:00",
                //   reviewLanguage: 0,
                //   mentorNickname: "나는야 멘토"
                // },
              ]
        }
    }
    
    componentDidMount(){
      const user = JSON.parse(sessionStorage.getItem('user'));
      const url = `http://192.168.45.135:31920/codereview/mentee/${user.menteeid}`;
        axios.get(url)
         .then(response =>{console.log(response)
            this.setState({
                loading: false,
                reviews : response.data
            })
        }) 
          .catch(error => {
            alert(error);
          })
    }



    render(){
        const {classes} = this.props;
            const reviewItems= this.state.reviews.map((r,reviewId)=>{
            return (
                <Grid item>
                <ReviewItem review={r} key={reviewId}/>
                
                </Grid>
            )
        })

    return(
        <div className={classes.root}>

            {/* <Typography aligh="center" variant="h5" gutterBottom={true}><br/>Room list</Typography> */}
            <GridList className={classes.gridList} cellHeight={'auto'} cols={3}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }} />
                
                {/* <PulseLoader
                    width={100}
                    size={20}
                    color={"#6600FF"}
                    loading={this.state.loading}
                /> */}
                {this.state.loading? <MoonLoader
                    margin={20}
                    width={100}
                    size={60}
                    color={"#9013FE"}
                    loading={this.state.loading}
                /> : <ListSubheader component="div">Review List</ListSubheader>}
                {reviewItems}


            </GridList>
        </div>
    )
}
}

export default withStyles(useStyles)(MenteeReviewList2);