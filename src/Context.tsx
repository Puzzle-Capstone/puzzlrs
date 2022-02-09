import React, { useState, useEffect, createContext } from 'react'
import { setSourceMapRange } from 'typescript';
import { PuzzleObjectInterface, UserObjectInterface, PuzzlesContextInterface } from './interfaces'

const PuzzleContext = createContext<PuzzlesContextInterface>(null!);

const PuzzleProvider: React.FC = ({children}) => {
	const [puzzles, setPuzzles] = useState([])
	const [loggedIn, setLoggedIn] = useState(false)
	const [user, setUser] = useState({})

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
		<PuzzleContext.Provider value={{ puzzles, loggedIn, logIn }}>
			{children}
		</PuzzleContext.Provider>
	)
}

export { PuzzleContext, PuzzleProvider }