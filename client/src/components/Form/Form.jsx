import { useState, useEffect } from 'react';
import { TextField, Typography, Button, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ( { currentId, setCurrentId } ) => {
  const [ form, setForm ] = useState( { title: '', message: '', tags: '', selectedFile: '' } );
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse( localStorage.getItem( 'profile' ) );
  const currentPost = useSelector( state => currentId ? state.posts.posts.find( post => post._id === currentId ) : null );

  useEffect( () => {
    if ( currentPost ) setForm( currentPost );
  }, [ currentPost ] );

  const handleSubmit = e => {
    e.preventDefault();

    currentId ? dispatch( updatePost( currentId, { ...form, name: user?.result.name } ) ) : dispatch( createPost( { ...form, name: user?.result.name }, navigate ) );

    handleClear();
  };

  const handleChange = e => setForm( { ...form, [ e.target.name ]: e.target.value } );

  const handleClear = () => {
    setCurrentId( null );
    setForm( { title: '', message: '', tags: '', selectedFile: '' } );
  };

  if ( !user?.result?.name ) {
    return (
      <Paper className={ classes.paper }>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other&apos;s memories.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={ classes.paper }>
      <form
        autoComplete="off"
        noValidate
        className={ `${ classes.form } ${ classes.root }` }
        onSubmit={ handleSubmit }
      >
        <Typography variant="h6">{ currentPost ? 'Update a memory' : 'Create a memory' }</Typography>
        <TextField
          label="Title"
          name="title"
          variant="outlined"
          fullWidth
          value={ form.title }
          onChange={ handleChange }  
        />
        <TextField
          label="Message"
          name="message"
          variant="outlined"
          fullWidth
          value={ form.message }
          onChange={ handleChange }  
        />
        <TextField
          label="Tags (coma seprated)"
          name="tags"
          variant="outlined"
          fullWidth
          value={ form.tags }
          onChange={ e => setForm( { ...form, tags: e.target.value.split( ',' ) } ) }  
        />
        <div className={ classes.fileInput }>
          <FileBase
            type="file"
            multiple={ false }
            onDone={ ( { base64 } ) => setForm( { ...form, selectedFile: base64 } ) }
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={ classes.buttonSubmit }
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={ handleClear }
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default Form