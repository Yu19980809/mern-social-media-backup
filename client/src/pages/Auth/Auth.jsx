import { useState, useEffect } from 'react';
import { Avatar, Button, Container, Paper, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { FormField, Icon } from '../../components';
import { signIn, signUp } from '../../actions/auth';

const Auth = () => {
  const [ showPassword, setShowPassword ] = useState( false );
  const [ isSignUp, setIsSignUp ] = useState( false );
  const [ form, setForm ] = useState( {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  } );
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect( () => {
    const initClient= () => gapi.client.init( { clientId: import.meta.env.VITE_GOOGLE_ID, scope: '' } );
    gapi.load( 'client:auth2', initClient );
  }, [] );

  const handleChange = e => setForm( { ...form, [ e.target.name ]: e.target.value } );

  const handleShowPassword = () => setShowPassword( prev => !prev );

  const switchMode = () => {
    setIsSignUp( prev => !prev );
    setShowPassword( false );
  };

  const googleSuccess = async ( res ) => {
    const result = res?.profileObj;
    const token = res?.tokenId

    try {
      dispatch( { type: 'AUTH', payload: { result, token }} );
      navigate( '/' );
    } catch (error) {
      console.log( error );
    }
  };

  const googleFailure = ( error ) => {
    console.log( error );
    console.log( 'Goole sign in was unsuccessful. Try again later.' )
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    isSignUp ? dispatch( signUp( form, navigate ) ) : dispatch( signIn( form, navigate ) );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={ classes.paper } elevation={ 3 }>
        <Avatar className={ classes.avatar }>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant="h5">
          { isSignUp ? 'Sign Up' : 'Sign In' }
        </Typography>

        <form className={ classes.form } onSubmit={ handleSubmit }>
          <Grid container spacing={ 2 }>
            { isSignUp && (
              <>
                <FormField
                  label="firstName"
                  name="firstName"
                  handleChange={ handleChange }
                  autoFocus
                  half
                />
                <FormField
                  label="lastName"
                  name="lastName"
                  handleChange={ handleChange }
                  half
                />
              </>
            ) }

            <FormField
              type="email"
              label="Email Address"
              name="email"
              handleChange={ handleChange }
            />
            <FormField
              type={ showPassword ? 'text' : 'password' }
              label="Password"
              name="password"
              handleChange={ handleChange }
              handleShowPassword={ handleShowPassword }
            />
            { isSignUp && (
              <FormField
                type="password"
                label="Repeat Password"
                name="confirmPassword"
                handleChange={ handleChange }
              />
            ) }
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={ classes.submit }
            fullWidth
          >
            { isSignUp ? 'Sign Up' : 'Sign In' }
          </Button>

          <GoogleLogin
            clientId={ import.meta.env.VITE_GOOGLE_ID }
            render={ renderProps => (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={ <Icon /> }
                className={ classes.googleButton }
                onClick={ renderProps.onClick }
                disabled={ renderProps.disabled }
              >
                Sign In with Google
              </Button>
            ) }
            onSuccess={ googleSuccess }
            onFailure={ googleFailure }
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={ switchMode }>
                { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth