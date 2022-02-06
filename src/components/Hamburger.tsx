import React, { useState } from 'react'
import '../css/Hamburger.css'
import { Link } from 'react-router-dom'

const Hamburger = () => {
	const [open, setOpen] = useState(false)

	return (
		<section>
			<section className={!open ? 'hamburger' : 'hamburger-active'} onClick={() => setOpen(!open)}>
				<span className={open ? 'bar bar1-active' : 'bar bar1'}></span>
				<span className={open ? 'bar bar2-active' : 'bar bar2'}></span>
			</section>
			<ul className={!open ? 'nav-menu' : 'nav-menu-active'}>
				<div className='nav-item'>
					<Link to={'/'} className='links' onClick={() => setOpen(!open)}>Home</Link>
				</div>
				<div className='nav-item'>
					<Link to={'/user-profile'} className='links' onClick={() => setOpen(!open)}>User Profile</Link>
				</div>
				<div className='nav-item'>
					<Link to={'/puzzles'} className='links' onClick={() => setOpen(!open)}>Puzzles</Link>
				</div>
				<div className='nav-item'>
					<Link to={'/add-puzzle'} className='links' onClick={() => setOpen(!open)}>Add Puzzle</Link>
				</div>
			</ul>
		</section>
	)
}


export default Hamburger; 