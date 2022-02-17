import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { PuzzleContext } from '../Context';
import { Select, InputLabel, FormControl } from "@mui/material";
import { usernameOptions, usernames } from "../utils";
import Hamburger from "./Hamburger";
import ErrorPage from './ErrorPage';
import '../css/Nav.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
		palette: {
			primary: {
				main: '#5D736B',
			},
		},
	})

const Nav = () => {
  const [username, setUsername] = useState('')
  const { loggedIn, logIn, error } = useContext(PuzzleContext)

  const handleLogIn = (username: string) => {
    setUsername(username)
    const userID = (usernames.indexOf(username) + 1).toString()
    logIn(userID)
  }

  const renderNavDisplay = !loggedIn ?
    <div>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </div> :
    <div>
      <Link to='/puzzles' className='link'><button>View Puzzles</button></Link>
      <Link to='/add-puzzle' className='link'><button>Add Puzzle</button></Link>
      <Link to='/user-profile' className='link'><button>User Profile</button></Link>
      <Hamburger />
    </div>

  return (
    !loggedIn ? 
    <header className='not-logged-in'>
      <Link to='/'><h1>puzzlrs</h1></Link>
      <div className='nav-buttons'>
        {renderNavDisplay}
      </div>
    </header> : 
    <header className='logged-in'>
    <Link to='/'><h1>puzzlrs</h1></Link>
    <div className='nav-buttons'>
      {renderNavDisplay}
    </div>
  </header>
  )
}

export default Nav;