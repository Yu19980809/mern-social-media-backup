import { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts';
import useStyles from './styles';

const Paginate = ( { page } ) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { totalPages } = useSelector( state => state.posts );

  useEffect( () => {
    dispatch( getPosts( page ) )
  }, [ page, dispatch ] );

  return (
    <Pagination
      variant="outlined"
      color="primary"
      page={ Number( page ) || 1 }
      count={ totalPages }
      classes={ { ul: classes.ul } }
      renderItem={ item => (
        <PaginationItem { ...item } component={ Link } to={ `/posts?page=${ item.page }` } />
      ) }
    />
  );
};

export default Paginate;
