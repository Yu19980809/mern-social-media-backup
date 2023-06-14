
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container} from '@material-ui/core';
import { Navbar, PostDetails } from './components';
import { Home, Auth } from './pages';

const App = () => {
  const user = JSON.parse( localStorage.getItem( 'profile' ) );

  return (
    <BrowserRouter>
      <Container maxwidth="xl">
        <Navbar />

        <Routes>
          <Route path="/" exact element={ <Navigate to="/posts" /> } />
          <Route path="/posts" exact element={ <Home /> } />
          <Route path="/posts/search" exact element={ <Home /> } />
          <Route path="/posts/:id" exact element={ <PostDetails /> } />
          <Route path="/auth" exact element={ !user ? <Auth /> : <Navigate to="/posts" /> } />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
