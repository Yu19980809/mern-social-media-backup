import { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getPost, getPostsBySearch } from '../../../actions/posts';
import useStyles from './styles';
import CommentSection from '../comment/CommentSection';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector( state => state.posts );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  
  useEffect( () => {
    dispatch( getPost( id ) );
  }, [ id, dispatch ] );

  useEffect( () => {
    if ( post ) {
      dispatch( getPostsBySearch( { query: 'none', tags: post?.tags.join( ',' ) } ) )
    }
  }, [ post, dispatch ] );

  const recommendedPosts = posts.filter( item => item._id !== post._id );

  const openPost = id => navigate( `/posts/${ id }` );

  if ( !post ) return null;

  if ( isLoading ) {
    return (
      <Paper elevation={ 6 } className={ classes.loadingPaper }>
        <CircularProgress size="7em" />
      </Paper>
    )
  }

  return (
    <Paper style={ { padding: '20px', borderRadius: '15px' } } elevation={ 6 }>
      {/* post details */}
      <div className={ classes.card }>
        <div className={ classes.section }>
          <Typography variant="h3" component="h2">{ post.title }</Typography>
          <Typography variant="h6" component="h2" color="textSecondary">
            { post.tags?.map( tag => `#${ tag }` ) }
          </Typography>
          <Typography variant="body1" component="p">{ post.message }</Typography>
          <Typography variant="h6">Created by: { post.name }</Typography>
          <Typography variant="body1">{ moment( post.createdAt ).fromNow() }</Typography>
          <Divider style={ { margin: '20px 0' } } />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={ { margin: '20px 0' } } />
          <CommentSection post={ post } />
          <Divider style={ { margin: '20px 0' } } />
        </div>

        <div className={ classes.imageSection }>
          <img
            className={ classes.media }
            src={ post.selectedFile || import.meta.env.VITE_DEFAULT_POST_IMG }
            alt={ post.title }
          />
        </div>
      </div>

      {/* recommended posts */}
      { ( recommendedPosts.length && recommendedPosts.length > 0 ) && (
        <div className={ classes.section }>
          <Typography variant="h5" gutterBottom>You might also like:</Typography>
          <Divider/>
          <div className={ classes.recommendedPosts }>
            { recommendedPosts.map( ( { title, name, message, likes, selectedFile, _id } ) => (
              <div
                key={ _id }
                style={ { margin: '20px', cursor: 'pointer' } }
                onClick={ () => openPost( _id ) }
              >
                <Typography variant="h6" gutterBottom>{ title }</Typography>
                <Typography variant="subtitle2" gutterBottom>{ name }</Typography>
                <Typography variant="subtitle2" gutterBottom>{ message }</Typography>
                <Typography variant="subtitle1" gutterBottom>Likes: { likes.length }</Typography>
                <img src={ selectedFile } width="200px" />
              </div>
            ) ) }
          </div>
        </div>
      ) }
    </Paper>
  )
}

export default PostDetails;