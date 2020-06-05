import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { withRouter, Link as RouterLink } from 'react-router-dom';

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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


export default function SignIn(props){

  const [user1] = React.useState({
    name: 'user123',
    email: 'user@email.com',
    gender: 0,
    regDate: '2020-05-30 00:00:00'
  })


  //localstorage에 추가 근데 함수안에 들어가면 안됨
  //localStorage.setItem('user', JSON.stringify(user1))

    const classes = useStyles();

    //validation check
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
  
      if(!isEmail(values.email))emailError = "email 형식이 아닙니다.";
      if(!isPwd(values.encryptedPassword))pwdError = "비밀번호는 최소 6자에서 20자사이, 영문과 숫자를 혼합하여 주세요."
  
      setError({
        emailError, pwdError
      })
  
      if(emailError || pwdError)return false;
      return true;
    }

    const [values, setValues] = React.useState({
      email: '',
      encryptedPassword: ''
    });
    const [error, setError] = React.useState({
      emailError: '',
      pwdError: ''
    })

    const [user, setUser] = React.useState({
      id: '',
      token: ''
    })

    const [test] = React.useState({
      name: 'test',
      id: 'test',
      token: 'testtoken',
      email: 'test@codeReview.com',
      encryptedPassword: 'test1234',
      gender: 0,
      regDate: '2020-05-30 00:00:00'
    })

    const handleChangeForm = e => {
      setValues({...values, [e.target.name]: e.target.value});
    }

    // React.useEffect(() =>{
    //   console.log('실행effect');
    //   if(user.id!==''){
    //     localStorage.setItem('user', JSON.stringify(user))
    //     //window.location.reload();
        
    //   return () => {
    //     props.history.push({
    //       pathname: '/',
    //       state: {user}
    //     });
    //   }
    // }
    // },[user])


    const handleSubmit=(e)=>{
      e.preventDefault();
      const valid = onTextValidation();   

    if(!valid)console.error("invalid");
    
    else{
    
      //id랑 token 받아오는거 해야함
      const url = 'http://59.29.224.144:10000/recoder/login';
      // axios.post(url, {
      //   email: values.email,
      //   encryptedPassword: values.encryptedPassword
      // })
      //  .then(response => console.log(response.headers)) 
      //  .then((data)=>{
      //    setUser({id :data.userId, token :data.token})})
      //   .catch(error => {
      //     console.log(error);
      //   })
      
      if(values.email === test.email && values.encryptedPassword === test.encryptedPassword){
 
         localStorage.setItem('user', JSON.stringify({id:test.id,
                                                      token: test.token}));
        props.history.push({
          pathname: '/'
        });

        window.location.reload();
      }

      //이메일 또는 비밀번호 잘못 입력했을때
      else{
        console.log('틀림');
      }

    }
  } // handleSubmit 끝

    return(
         <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={values.email}
            onChange={handleChangeForm}
          />
          <div style={{ color: "red", fontSize: "12px" }}>
                {error.emailError}
          </div>
          <TextField
            variant="outlined"
            margin="normal"
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link variant="body2" component={RouterLink} to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
