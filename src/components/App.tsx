import { Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import UserProfile from './UserProfile';
import PuzzleContainer from './PuzzleContainer';
import AddPuzzleForm from './AddPuzzleForm';
import ErrorPage from './ErrorPage';
import { PuzzleProvider } from '../Context';
import '../css/App.css';

function App() {
  return (
    <PuzzleProvider>
      <div className='App'>
        <Nav />
        <Routes>
          <Route path='/' element={
            <div className='flex'>
              <Home />
            </div>
          } />
          <Route path='/user-profile' element={
            <UserProfile />
          } />
          <Route path='/puzzles' element={
            <PuzzleContainer />
          } />
          <Route path='/add-puzzle' element={
            <AddPuzzleForm />
          } />
          <Route path='/:invalid' element={
            <div className='flex'>
              <ErrorPage message="Oops! You've made your way to an invalid URL."/>
            </div>
          } />
        </Routes>
      </div>
    </PuzzleProvider>
  );
}

export default App;
