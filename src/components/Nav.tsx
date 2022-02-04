import React from "react";
import { Link } from 'react-router-dom';
import '../css/Nav.css';

const Nav = () => {
  return (
    <header>
      <Link to='/'><h1>Puzzlrs</h1></Link>
      <div className='nav-buttons'>
        <Link to='/user-profile'><button>userProfile</button></Link>
        <Link to='/add-puzzle'><button>Add Puzzle</button></Link>
      </div>
    </header>
  )
}

export default Nav;