import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import { Select } from '@material-ui/core';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function SignUp(props){

  const isEmail = email => {
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  
    return emailRegex.test(email);
  };
  const isPwd = pass => {
    const pwdRegex = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
    
    return pwdRegex.test(pass);
   }

  const onTextValidation = () => {
    let emailError = "";
    let pwdError = "";
    let nameError = "";

    if(!isEmail(values.email))emailError = "email 형식이 아닙니다.";
    if(!isPwd(values.encryptedPassword))pwdError = "비밀번호는 최소 6자에서 20자사이, 영문과 숫자를 혼합하여 주세요."
    if(values.name.length === 0)nameError="이름을 입력해주세요.";

    setError({
      emailError, pwdError, nameError
    })

    if(emailError || pwdError || nameError)return false;
    return true;
  }

  const classes = useStyles();
  const [error, setError] = React.useState({
    emailError: '',
    pwdError: '',
    nameError: ''
  })
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    encryptedPassword: '',
    gender: 0
  });

  const handleChangeForm = e => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const valid = onTextValidation();

    if(!valid)console.error("invalid");

    else{
      const url = 'http://192.168.45.198:10000/users';
      axios.post(url, {
        name: values.name,
        email: values.email,
        encryptedPassword: values.encryptedPassword,
        gender: values.gender
      })
      .then(response =>{
        alert("가입이 완료 되었습니다.")
        props.history.push({
          pathname: '/signin'
        });
      
      }
        ) 
        .catch(error => {
          alert("이미 존재하는 회원입니다.")
          setValues({email:'', encryptedPassword:''});
        })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>             
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChangeForm}
              />
              <div style={{ color: "red", fontSize: "12px" }}>
                {error.emailError}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="encryptedPassword"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.encryptedPassword}
                onChange={handleChangeForm}
              />
              <div style={{ color: "red", fontSize: "12px" }}>
              {error.pwdError}
            </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={handleChangeForm}
              />
              <div style={{ color: "red", fontSize: "12px" }}>
              {error.nameError}
            </div>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Select
                variant="outlined"
                required
                fullWidth
                id="gender"
                // select
                value={values.gender}
                onChange={handleChangeForm}
                inputProps={{
                  name: 'gender',
                  id: 'gender'
                }}
                >
                <MenuItem value="0">여성</MenuItem>
                <MenuItem value="1">남성</MenuItem>
                </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" component={RouterLink} to="/signin">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
