import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, LIKE, DELETE, SEARCH, COMMENT, START_LOADING, END_LOADING } from '../constants/actionType';

export default ( state = { isLoading: true, posts: [] }, action ) => {
  switch ( action.type ) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages
      };
    case FETCH_POST:
      return { ...state, post: action.payload };
    case SEARCH:
      return { ...state, posts: action.payload };
    case CREATE:
      return {...state, posts: [ ...state.posts, action.payload ] };
    case UPDATE:
    case LIKE:
      return { ...state, post: state.posts.map( post => post._id === action.payload._id ? action.payload : post ) };
    case COMMENT:
      return {
        ...state,
        post: action.payload,
        posts: state.posts.map( post => {
          if ( post._id === action.payload._id ) {
            return action.payload;
          }
          return post;
        } )
      };
    case DELETE:
      return { ...state, posts: state.posts.filter( post => post._id !== action.payload._id ) };
    default:
      return state;
  }
}