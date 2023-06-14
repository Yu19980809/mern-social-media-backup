import axios from 'axios';

const API = axios.create( { baseURL: 'http://localhost:5000/api/v1' } );

API.interceptors.request.use( ( req ) => {
  const user = localStorage.getItem( 'profile' );
  if ( user ) {
    req.headers.Authorization = `Bearer ${ JSON.parse( user ).token }`;
  }

  return req;
} );

const fetchPosts = page => API.get( `/posts?page=${ page }` );

const fetchPostsBySearch = searchQuery => API.get( `/posts/search?query=${ searchQuery.search || 'none' }&tags=${ searchQuery.tags }` );

const fetchPost = id => API.get( `/posts/${ id }` );

const createPost = postData => API.post( '/posts', postData );

const updatePost = ( currentId, updateData ) => API.patch( `/posts /${ currentId }`, updateData )

const deletePost = id => API.delete( `/posts /${ id }` );

const likePost = id => API.patch( `/posts/${ id }/likePost` );

const commentPost = ( comment, id ) => API.patch( `/posts/${ id }/commentPost`, { comment } );

const signIn = data => API.post( '/user/signin', data );

const signUp = data => API.post( '/user/signup', data );

export {
  fetchPosts,
  fetchPostsBySearch,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  signIn,
  signUp
};
