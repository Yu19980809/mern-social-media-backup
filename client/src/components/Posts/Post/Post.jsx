import { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ( { data, setCurrentId } ) => {
  const [ likes, setLikes ] = useState( data?.likes );
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse( localStorage.getItem( 'profile' ) );
  const userId = user?.result.googleId || user?.result._id
  const isLikedPost = likes.includes( userId );

  const handleClick = () => setCurrentId( data._id );

  const handleLike = () => {
    dispatch( likePost( data._id ) )
    
    if ( isLikedPost ) {
      setLikes( likes.filter( like => like !== userId ) );
    } else {
      setLikes( [ ...likes ], userId );
    }
  };

  const handleDelete = () => dispatch( deletePost( data._id ) );

  const openPost = () => navigate( `/posts/${ data._id }` );

  const Like = () => {
    if ( likes.length <= 0 ) return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>

    return likes.includes( userId ) ? (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;{ likes.length > 2 ? `Yu and ${ likes.length - 1 } others` : `${ likes.length } like${ likes.length > 1 ? 's' : '' }` }
      </>
    ) : (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;{ likes.length } { likes.length === 1 ? 'Like' : 'Likes' }
      </>
    )
  };

  return (
    <Card className={ classes.card } raised elevation={ 6 }>
      <ButtonBase
        name="test"
        component="span"
        className={ classes.cardAction }
        onClick={ openPost }
      >
        <CardMedia
          className={ classes.media }
          image={ data.selectedFile }
          title={ data.title }
        />

        <div className={ classes.overlay }>
          <Typography variant="h6">{ data.name }</Typography>
          <Typography variant="body2">{ moment( data.createdAt ).fromNow() }</Typography>
        </div>

        { ( user?.result?.googleId === data.creator || user?.result?._id === data.creator ) && (
          <div className={ classes.overlay2 }>
            <Button
              style={ { color: 'white' } }
              size="small"
              onClick={ handleClick }
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        ) }

        <div className={ classes.details }>
          <Typography variant="body2" color="textSecondary">
            { data.tags.map( tag => `#${ tag } ` ) }
          </Typography>
        </div>

        <Typography className={ classes.title } variant="h5" gutterBottom>{ data.title }</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{ data.message }</Typography>
        </CardContent>
      </ButtonBase>
      
      <CardActions className={ classes.cardActions }>
        <Button size="small" color="primary" disabled={ !user?.result } onClick={ handleLike }>
          <Like />
        </Button>

        { ( user?.result?.googleId === data.creator || user?.result?._id === data.creator ) && (
          <Button size="small" color="primary" onClick={ handleDelete }>
            <DeleteIcon fontSize="small" />
            &nbsp;Delete
          </Button>
        ) }
      </CardActions>
    </Card>
  )
}

export default Post