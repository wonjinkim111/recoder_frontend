import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://www.multicampus.com/main/">
        multicampus
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    zIndex: '-1000',
    backgroundColor: theme.palette.background.default,
  },
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: 'flex'
  },
  iconsWrapper: {
    height: 20,
  },
  icons: {
    display: 'flex',
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
}));

export default function FootBar() {
  const classes = useStyles();

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
          <Copyright />
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              made by Yaas
            </Typography>
            team Leader : 
            <Link href="https://github.com/wonjinkim111" rel="team" title="kimwonjin">
            &nbsp; wonjin Kim <br/>
            </Link>
            Front-end : 
            <Link href="https://github.com/jingnee" rel="team" title="chojiyun">
            &nbsp; jiyun Cho
            </Link>
            , &nbsp;
            <Link href="https://github.com/ry7791" rel="team" title="gojunguk">
                junguk Go <br/>
            </Link>
            Back-end : 
            <Link href="https://github.com/nangzz" rel="team" title="kangmina">
            &nbsp; mina Kang
            </Link>
          </Grid>
          <Grid item>
          <Typography variant="caption">
              {'Icons made by '}
              <Link href="https://www.freepik.com" rel="sponsored" title="Freepik">
                Freepik
              </Link>
              {' from '}
              <Link href="https://www.flaticon.com" rel="sponsored" title="Flaticon">
                www.flaticon.com
              </Link>
              {' is licensed by '}
              <Link
                href="https://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC 3.0 BY
              </Link>
            </Typography>
              </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
