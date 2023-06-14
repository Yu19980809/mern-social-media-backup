import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ( { setCurrentId } ) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector( state => state.posts );

  if ( !posts.length && !isLoading ) return 'No Posts'

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={ classes.container } container alignItems="stretch" spacing={ 3 }>
        { posts.map( post => (
          <Grid key={ post._id } item xs={ 12 } sm={ 12 } md={ 6 } lg={ 3 }>
            <Post data={ post } setCurrentId={ setCurrentId } />
          </Grid>
        ) ) }
      </Grid>
    )
  )
}

export default Posts