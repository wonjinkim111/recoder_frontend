import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import {Link as RouterLink} from 'react-router-dom';

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

export default function ToolbarAfter() {
  const classes = useStyles();
  const [users] = React.useState({
    name: 'user111',
    email: 'user1@email.com',
    gender: 0,
    regDate: '2020-05-30 00:00:00'
  })

  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
  }

  // componentWillMount = () => {
  //   if(users.gender==0)
  //   setUsers({...users, gender:'여성'})
  //   else
  //   setUsers({...users, gender:'남성'})
  // }

  return (
    <div className={classes.root}>
    <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            component={RouterLink} to="/"
          >
            {'Re:coder'}
          </Link>
          <div className={classes.right}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              component={RouterLink} 
              to= {{
                pathname : "/profile",
                state : {
                  username: users.name,
                  useremail: users.email,
                  usergender: users.gender,
                  userregdate: users.regDate
                }
              }}
            >
              {'Profile'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              onClick={handleClick}
              component={RouterLink} to="/"
            >
              {'LogOut'}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}