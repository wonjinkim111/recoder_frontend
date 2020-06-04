import React from 'react';
import Container from '@material-ui/core/Container';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function MentorLogin(){
    return(
        <Container maxWidth="sm">
            <Typography component="div" style={{height: '70vh' }} >
             <Button variant="contained" color="secondary">멘토생성하려면 클릭!</Button> 
            </Typography>
        </Container>
    )
}