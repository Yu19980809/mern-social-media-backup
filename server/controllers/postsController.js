import mongoose from 'mongoose';
import Post from '../models/post.js';

const checkId = id => {
  if ( !mongoose.Types.ObjectId.isValid( id ) ) {
    return res.status( 404 ).send( 'Not a valid id' );
  }
}

const getPosts = async ( req, res ) => {
  const { page } = req.query;

  try {
    const LIMIT = 2;
    const startIndex = ( Number( page ) - 1 ) * LIMIT;

    const total = await Post.countDocuments( {} );
    const posts = await Post.find().sort( { createdAt: -1 } ).skip( startIndex ).limit( LIMIT );
    res.status( 200 ).json( { success: true, data: posts, currentPage: Number( page ), totalPages: Math.ceil( total / LIMIT ) } );
  } catch (error) {
    res.status( 404 ).json( { success: false, message: error.message } );
  }
}

const getPostsBySearch = async ( req, res ) => {
  const { query, tags } = req.query;

  try {
    const title = new RegExp( query, 'i' );
    const posts = await Post.find( { $or: [ { title }, { tags: { $in: tags.split( ',' ) } } ] } );
    res.status( 200 ).json( { success: true, data: posts } );
  } catch (error) {
    res.status( 404 ).json( { success: false, message: error.message } );
  }
};

const getPost = async ( req, res ) => {
  const { id } = req.params;
  checkId( id );

  try {
    const post = await Post.findById( id );
    res.status( 200 ).json( post );
  } catch (error) {
    res.status( 404 ).json( error.message );
  }
}

const createPost = async ( req, res ) => {
  const { title, message, selectedFile, tags, name} = req.body;

  try {
    const newPost = await Post.create( { title, message, selectedFile, name, tags, creator: req.userId } );
    res.status( 200 ).json( newPost );
  } catch (error) {
    res.status( 404 ).json( error.message );
  }
}

const deletePost = async ( req, res ) => {
  const { id } = req.params;
  checkId( id );

  try {
    await Post.findByIdAndDelete( id )
    res.status( 200 ).json( { message: 'Post deleted successfully' } )
  } catch (error) {
    res.status( 404 ).json( error.message );
  }
}

const updatePost = async ( req, res ) => {
  const { id } = req.params;
  checkId( id );

  try {
    const updatedPost = await Post.findByIdAndUpdate( id, req.body, { new: true } );
    res.status( 200 ).json( updatedPost);
  } catch (error) {
    res.status( 404 ).json( error.message );
  }
}

const likePost = async ( req, res ) => {
  if ( !req.userId ) return res.json( { message: 'Unauthenticated' } );
  const { id } = req.params;
  checkId( id );

  try {
    const post = await Post.findById( id );
    const index = post.likes.findIndex( id => id === String( req.userId ) );
    if ( index === -1 ) {
      post.likes.push( req.userId );
    } else {
      post.likes.filter( id => id !== String( req.userId ) );
    }

    const updatedPost = await Post.findByIdAndUpdate( id, post, { new: true } );
    res.status( 200 ).json( updatedPost );
  } catch (error) {
    res.status( 404 ).json( error.message );
  }
}

const commentPost = async ( req, res ) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const post = await Post.findById( id );
    post.comments.push( comment );
    const updatedPost = await Post.findByIdAndUpdate( id, post, { new: true } );
    res.status( 200 ).json( { success: true, data: updatedPost } );
  } catch (error) {
    res.status( 404 ).json( error.message );
  }
}

export {
  getPosts,
  getPostsBySearch,
  getPost,
  createPost,
  deletePost,
  updatePost,
  likePost,
  commentPost
};
