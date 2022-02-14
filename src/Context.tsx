import React, { useState, useEffect, createContext } from 'react'
import { setSourceMapRange } from 'typescript';
import { IPuzzleObject, IUserObject, IPuzzleContext, IPuzzleProvider, ICleanedPuzzleObject } from './interfaces'

const PuzzleContext = createContext({} as IPuzzleContext);

const PuzzleProvider = ({children}: IPuzzleProvider) => {
	const [puzzles, setPuzzles] = useState<ICleanedPuzzleObject[]>([])
	const [loggedIn, setLoggedIn] = useState(false)
	const [user, setUser] = useState({} as IUserObject);
	const [newPuzzle, setNewPuzzle] = useState({});
	const [userID, setuserID] = useState('');

	const fetchPuzzles = async () => {
    try {
      const puzzleData = await fetch('https://puzzlrs.herokuapp.com/api/v1/puzzles')
      const { data } = await puzzleData.json()
			setPuzzles(data.map((puzzle: IPuzzleObject) => {
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
			const userDetails: IUserObject = {
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
		setuserID(userId)
		fetchUser(userId)
		setLoggedIn(true)
	}

	// const addPuzzle = (newPuzzle: IPuzzleObject) => {
	// 	setNewPuzzle(newPuzzle);
	// }

	useEffect(() => {
		fetchPuzzles();
	}, [puzzles])

	useEffect(() => {
		fetchUser(user.id)
	}, [user])
 
	return (
		<PuzzleContext.Provider value={{ puzzles, loggedIn, logIn, user, userID }}>
			{children}
		</PuzzleContext.Provider>
	)
}

export { PuzzleContext, PuzzleProvider }