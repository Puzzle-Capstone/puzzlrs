import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import { usernameOptions, usernames } from "../utils";
import Hamburger from "./Hamburger";
import { PuzzleContext } from '../Context';
import '../css/Nav.css';

const Nav = () => {
  const [username, setUsername] = useState('')
  const { loggedIn, logIn } = useContext(PuzzleContext)

  const handleLogIn = (username: string) => {
    setUsername(username)
    const userID = (usernames.indexOf(username) + 1).toString()
    console.log(userID)
    logIn(userID)
  }

  const renderNavDisplay = !loggedIn ?
    <div>
      <FormControl variant="standard">
        <InputLabel>Log In</InputLabel>
        <Select
          className='login-dropdown'
          name='login'
          value={username}
          onChange={event => handleLogIn(event.target.value)}
        >
          {usernameOptions}
        </Select>
      </FormControl>
    </div> :
    <div>
      <Link to='/puzzles' className='link'><button>View Puzzles</button></Link>
      <Link to='/add-puzzle' className='link'><button>Add Puzzle</button></Link>
      <Link to='/user-profile' className='link'><button>User Profile</button></Link>
      <Hamburger />
    </div>

  return (
    <header>
      <Link to='/'><h1>puzzlrs</h1></Link>
      <div className='nav-buttons'>
        {renderNavDisplay}
      </div>
    </header>
  )
}

export default Nav;