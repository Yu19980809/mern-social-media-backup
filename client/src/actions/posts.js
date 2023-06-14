import * as api from '../api';
import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, LIKE, DELETE, SEARCH, COMMENT, START_LOADING, END_LOADING } from '../constants/actionType';

const getPosts = ( page ) => async ( dispatch ) => {
  try {
    dispatch( { type: START_LOADING } );
    const { data } = await api.fetchPosts( page );
    dispatch( { type: FETCH_ALL, payload: data } );
    dispatch( { type: END_LOADING } );
  } catch (error) {
    console.log( error );
  }
}

const getPostsBySearch = searchQuery => async ( dispatch ) => {
  try {
    dispatch( { type: START_LOADING } );
    const { data: { data } } = await api.fetchPostsBySearch( searchQuery );
    dispatch( { type: SEARCH, payload: data } );
    dispatch( { type: END_LOADING } );
  } catch (error) {
    console.log( error );
  }
}

const getPost = id => async ( dispatch ) => {
  try {
    dispatch( { type: START_LOADING } );
    const { data } = await api.fetchPost( id );
    dispatch( { type: FETCH_POST, payload: data } );
    dispatch( { type: END_LOADING } );
  } catch (error) {
    console.log( error );
  }
}

const createPost = ( postData, navigate ) => async ( dispatch ) => {
  try {
    dispatch( { type: START_LOADING } );
    const { data } = await api.createPost( postData );
    navigate( `/posts/${ data._id }` );
    dispatch( { type: CREATE, payload: data } );
    dispatch( { type: END_LOADING } );
  } catch (error) {
    console.log( error );
  }
}

const updatePost = ( currentId, updateData ) => async ( dispatch ) => {
  try {
    dispatch( { type: START_LOADING } );
    const { data } = await api.updatePost( currentId, updateData );
    dispatch( { type: UPDATE, payload: data } );
    dispatch( { type: END_LOADING } );
  } catch (error) {
    console.log( error );
  }
}

const deletePost = id => async ( dispatch ) => {
  try {
    dispatch( { type: START_LOADING } );
    await api.deletePost( id );
    dispatch( { type: DELETE, payload: id } );
    dispatch( { type: END_LOADING } );
  } catch (error) {
    console.log( error );
  }
}

const likePost = id => async ( dispatch ) => {
  try {
    dispatch( { type: START_LOADING } );
    const { data } = await api.likePost( id );
    dispatch( { type: LIKE, payload: data } );
    dispatch( { type: END_LOADING } );
  } catch (error) {
    console.log( error );
  }
}

const commentPost = ( comment, id ) => async ( dispatch ) => {
  try {
    const { data: { data } } = await api.commentPost( comment, id );
    dispatch( { type: COMMENT, payload: data } );
    return data;
  } catch (error) {
    console.log( error );
  }
}

export {
  getPosts,
  getPostsBySearch,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost
};
