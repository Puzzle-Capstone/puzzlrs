import React from "react";
import '../css/Nav.css';

const Nav = () => {
  return (
    <header>
      <h1>Puzzlrs</h1>
      <div className='nav-buttons'>
        <button>Log In</button>
        <button>Sign Up</button>
      </div>
    </header>
  )
}

export default Nav;