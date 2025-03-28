import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  title: {
    flexGrow: 1,
    fontSize: 24,
  },
}));

export default function ToolbarBefore() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <AppBar position="static" style={{backgroundColor:'#3E007C'}}>
        <Toolbar className={classes.toolbar}>
          <Link component={RouterLink} to="/"
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
          >
            {'Re:coder'}
          </Link>
          <div className={classes.right}>
            <Link component={RouterLink} to="/signin"
              color="inherit"
              variant="h6"
              underline="none"
              // style={{padding:"50px"}}
              className={classes.rightLink}
              rel="signIn"
            >
              {'Sign In'}
            </Link>
            <Link component={RouterLink} to="/signup"
              variant="h6"
              // style={{padding:"50px"}}
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
            >
              {'Sign Up'}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}