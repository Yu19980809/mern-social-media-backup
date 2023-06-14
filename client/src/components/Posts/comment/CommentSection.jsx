import { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../../actions/posts';
import useStyles from '../PostDetails/styles';

const CommentSection = ( { post } ) => {
  const user = JSON.parse( localStorage.getItem( 'profile' ) );
  const [ comment, setComment ] = useState( '' );
  const [ comments, setComments ] = useState( post?.comments );
  const dispatch = useDispatch();
  const classes = useStyles();
  const commentsRef = useRef();

  const handleChange= e => setComment( e.target.value );

  const handleComment = async () => {
    const newComments = await dispatch( commentPost( `${ user?.result.name }: ${ comment }`, post._id ) );
    setComment( '' );
    setComments( newComments );
    commentsRef.current.scrollIntoView( { behavior: 'smooth' } );
  }

  return (
    <div>
      <div className={ classes.commentsOuterContainer }>
        {/* comments list */}
        <div className={ classes.commentsInnerContainer }>
          <Typography variant="h6" gutterBottom>Comments</Typography>

          { comments?.map( ( comment, index ) => (
            <Typography key={ index } variant="subtitle1" gutterBottom>
              <strong>{ comment.split( ':' )[0] }:&nbsp;</strong>
              { comment.split( ':' )[1] }
            </Typography>
          ) ) }

          <div ref={ commentsRef } />
        </div>

        {/* write comment */}
        { user?.result?.name && (
          <div style={ { width: '70%' } }>
            <Typography variant="h6" gutterBottom>Write a comment</Typography>
            <TextField
              variant="outlined"
              label="Comment"
              name="comment"
              value={ comment }
              multiline
              rows={ 4 }
              fullWidth
              onChange={ handleChange }
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={ { marginTop: '10px' } }
              fullWidth
              disabled={ !comment.length }
              onClick={ handleComment }
            >
              Comment
            </Button>
          </div>
        ) }
      </div>
    </div>
  )
}

export default CommentSection;