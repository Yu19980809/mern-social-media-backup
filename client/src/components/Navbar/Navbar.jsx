import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Button } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';
import { memoriesLogo, memoriesText } from '../../assets';

const Navbar = () => {
  const [ user, setUser ] = useState( JSON.parse( localStorage.getItem( 'profile' ) ) );
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch( { type: 'LOGOUT' } );
    navigate( '/auth' );
    setUser( null );
  };

  useEffect( () => {
    const token = user?.token;
    if ( token ) {
      const decodeToken = decode( token );
      if ( decodeToken.exp * 1000 < new Date().getTime() ) handleLogout()
    }

    setUser( JSON.parse( localStorage.getItem( 'profile' ) ) );
  }, [ location ] );

  

  return (
    <AppBar className={ classes.appBar } position="static" color="inherit">
      <Link to="/" className={ classes.brandContainer }>
        <img
          src={ memoriesText }
          alt="memoriesText"
          height="45px"
          className={ classes.image }
        />
        <img
          src={ memoriesLogo }
          alt="memoriesLogo"
          height="40px"
          className={ classes.image }
        />
      </Link>

      <Toolbar className={ classes.toolbar }>
        { user ? (
          <div className={ classes.profile }>
            <Avatar
              className={ classes.purple }
              src={ user.result.imageUrl }
              alt={ user.result.name }
            >
              { user.result.name.charAt( 0 ) }
            </Avatar>
            <Typography
              className={ classes.userName }
              variant="h6"
            >
              { user.result.name }
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              className={ classes.logout }
              onClick={ handleLogout }
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={ Link }
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        ) }
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
