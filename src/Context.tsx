import { useState, useEffect, createContext } from 'react'
import { IPuzzleObject, IUserObject, IPuzzleContext, IPuzzleProvider, ICleanedPuzzleObject } from './interfaces'
import ErrorPage from './components/ErrorPage';
import Puzzle from './components/Puzzle';

const PuzzleContext = createContext({} as IPuzzleContext);

const PuzzleProvider = ({ children }: IPuzzleProvider) => {
	const [puzzles, setPuzzles] = useState<ICleanedPuzzleObject[]>([])
	const [loggedIn, setLoggedIn] = useState(false)
	const [user, setUser] = useState({
		id: '',
		username: '',
		puzzles: [],
		sentRequests: [],
		receivedRequests: []
	} as IUserObject);
	const [error, setError] = useState(false);

	const fetchPuzzles = async () => {
		try {
			const puzzleData = await fetch('https://puzzlrs.herokuapp.com/api/v1/puzzles')
			if (puzzleData.ok) {
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
			} else {
				throw new Error('Failed to fetch.')
			}
		} catch (err) {
			setError(true)
		}
	}

	const fetchUser = async (id: string) => {
		if (id) {
			try {
				const userData = await fetch(`https://puzzlrs.herokuapp.com/api/v1/users/${id}`)
				if (userData.ok) {
					const { data } = await userData.json()
					const userDetails: IUserObject = {
						id: data.id,
						username: data.attributes.username,
						puzzles: data.attributes.puzzles,
						sentRequests: data.attributes.sent_requests,
						receivedRequests: data.attributes.received_requests
					}
					setUser(userDetails)
				} else {
					throw new Error('Failed to fetch.')
				}
			} catch (err) {
				setError(true)
			}
		}
	}

	const requestPuzzle = async (puzzleId: string | number) => {
		const res = await fetch('https://puzzlrs.herokuapp.com/api/v1/requests', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_id: user.id,
				puzzle_id: puzzleId
			})
		})
		const { data } = await res.json()
		console.log(data)
	}

	const updatePuzzleStatus = async (status: string, requestID: number | undefined) => {
		try {
			const res = await fetch('https://puzzlrs.herokuapp.com/api/v1/requests/' + requestID, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					status: status
				})
			})
			const { data } = await res.json()
			refreshData(user.id)
		} catch(err) {
			console.log(err)
		}
	}

	const logIn = (userId: string) => {
		fetchUser(userId)
		setLoggedIn(true)
	}

	const refreshData = (id: string) => {
		fetchPuzzles()
		fetchUser(id)
	}

	useEffect(() => {
		refreshData(user.id)
	}, [])

	return (
		<PuzzleContext.Provider value={{ refreshData, puzzles, loggedIn, logIn, user, requestPuzzle, updatePuzzleStatus, error }}>
			{children}
		</PuzzleContext.Provider>
	)
}

export { PuzzleContext, PuzzleProvider }