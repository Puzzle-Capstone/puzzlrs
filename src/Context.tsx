import React, { useState, useEffect, createContext } from 'react'
import { setSourceMapRange } from 'typescript';
<<<<<<< HEAD
import { PuzzleObjectInterface, UserObjectInterface, PuzzlesContextInterface } from './interfaces'
=======

interface PuzzleObjectInterface {
	id: string 
	attributes: {
		image: string
		category: string
		piece_count: string
		missing_pieces: string
		availability: boolean
		quality: string
		original_price_point: string
	}
}

interface UserObjectInterface {
		id: string,
		username: string,
		puzzles: UserPuzzles[],
		sentRequests: Requests[],
		receivedRequests: Requests[]
}

export interface UserPuzzles {
	id: number 
	user_id: number
	image: string
	category: string
	quality: string
	piece_count: string
	missing_pieces: string
	original_price_point: string
	created_at: string
	updated_at: string 
	availability: boolean 
}

interface Requests {
	id: number
	user_id: number
	puzzle_id: number 
	status: string 
	created_at: string
	updated_at: string 
}

export interface cleanedPuzzleObjectInterface {
	id: string
	image: string
	category: string
	pieceCount: string
	missingPieces: string
	availability: boolean
	quality: string
	price: string
	[key: string]: string | boolean
}

interface PuzzlesContextInterface {
	puzzles: cleanedPuzzleObjectInterface[] 
	loggedIn: boolean
	user: UserObjectInterface 
	logIn: (user: string) => void
}
>>>>>>> 2993b30 (Add puzzle details to module on user page puzzles click)

const PuzzleContext = createContext<PuzzlesContextInterface>(null!);

const PuzzleProvider: React.FC = ({children}) => {
	const [puzzles, setPuzzles] = useState([])
	const [loggedIn, setLoggedIn] = useState(false)
	const [user, setUser] = useState<UserObjectInterface>(null!)

	const fetchPuzzles = async () => {
    try {
      const puzzleData = await fetch('https://puzzlrs.herokuapp.com/api/v1/puzzles')
      const { data } = await puzzleData.json()
			setPuzzles(data.map((puzzle: PuzzleObjectInterface) => {
				return {
					id: puzzle.id,
					image: puzzle.attributes.image,
					category: puzzle.attributes.category,
					pieceCount: puzzle.attributes.piece_count,
					missingPieces: puzzle.attributes.missing_pieces,
					availability: puzzle.attributes.availability,
					quality: puzzle.attributes.quality,
					price: puzzle.attributes.original_price_point
				}
			}))
    } catch (err) {
      console.log(err)
    }
  }

	const fetchUser = async (id: string) => {
    try {
      const userData = await fetch(`https://puzzlrs.herokuapp.com/api/v1/users/${id}`)
      const { data } = await userData.json()
			const userDetails: UserObjectInterface = {
				id: data.id,
				username: data.attributes.username,
				puzzles: data.attributes.puzzles,
				sentRequests: data.attributes.sent_requests,
				receivedRequests: data.attributes.received_requests
			}
			setUser(userDetails)
    } catch (err) {
      console.log(err)
    }
  }

	const logIn = (userId: string) => {
		fetchUser(userId)
		setLoggedIn(true)
	}

	useEffect(() => {
		fetchPuzzles();
	}, [])
 
	return (
		<PuzzleContext.Provider value={{ puzzles, loggedIn, logIn, user }}>
			{children}
		</PuzzleContext.Provider>
	)
}

export { PuzzleContext, PuzzleProvider }