import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Posts, Pagination } from '../../components';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

const useQuery = () => {
  return new URLSearchParams( useLocation().search );
};

const Home = () => {
  const [ currentId, setCurrentId ] = useState( null );
  const [ search, setSearch ] = useState( '' );
  const [ tags, setTags ] = useState( [] );
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get( 'page' ) || 1;
  const searchQuery = query.get( 'searchQuery' );

  const handleKeyPress = e => {
    if ( e.keyCode === 13 ) searchPost()
  };

  const handleChange = e => setSearch( e.target.value );

  const handleAddChip = chip => setTags( [ ...tags, chip ] );

  const handleDeleteChip = chip => setTags( tags.filter( tag => tag !== chip ) );

  const searchPost = () => {
    if ( search.trim() || tags ) {
      dispatch( getPostsBySearch( { search, tags: tags.join( ',' ) } ) );
      navigate( `/posts/search?searchQuery=${ search || 'none' }&tags=${ tags.join( ',' ) }` );
    } else {
      navigate( '/' );
    }
    setTags( [] );
    setSearch( '' );
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={ 3 }
          className={ classes.gridContainer }
        >
          <Grid item xs={ 12 } sm={ 6 } md={ 9 }>
            <Posts setCurrentId={ setCurrentId } />
          </Grid>

          <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
            {/* search */}
            <AppBar position="static" color="inherit" className={ classes.appBarSearch }>
              <TextField
                variant="outlined"
                label="Search Memories"
                name="search"
                value={ search }
                fullWidth
                onKeyDown={ handleKeyPress }
                onChange={ handleChange }
              />

              <ChipInput
                variant="outlined"
                label="Search Tags"
                value={ tags }
                style={ { margin: '10px 0' } }
                onAdd={ chip => handleAddChip( chip ) }
                onDelete={ chip => handleDeleteChip( chip ) }
              />

              <Button
                variant="contained"
                color="primary"
                className={ classes.searchButton }
                onClick={ searchPost }
              >
                Search
              </Button>
            </AppBar>

            {/* form */}
            <Form currentId={ currentId } setCurrentId={ setCurrentId } />

            {/* paination */}
            { ( !searchQuery && !tags.length ) && (
              <Paper elevation={ 6 } className={ classes.pagination }>
                <Pagination page={ page } />
              </Paper>
            ) }
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
