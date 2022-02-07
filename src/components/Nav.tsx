import React from "react";
import { Link } from 'react-router-dom';
import '../css/Nav.css';
import Hamburger from "./Hamburger";

const Nav = () => {
  return (
    <header>
      <Link to='/'><h1>Puzzlrs</h1></Link>
      <div className='nav-buttons'>
        <Link to='/user-profile' className='link'><button>userProfile</button></Link>
        <Link to='/add-puzzle' className='link'><button>Add Puzzle</button></Link>
        <Hamburger />
      </div>
    </header>
  )
}

export default Nav;