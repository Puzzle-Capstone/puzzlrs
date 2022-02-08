import React, { useState, useEffect, createContext } from 'react'

interface PuzzlesContextInterface {
	puzzles: PuzzleObjectInterface[]
}

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

const PuzzleContext = createContext<PuzzlesContextInterface>(null!);

const PuzzleProvider: React.FC = ({children}) => {
	const [puzzles, setPuzzles] = useState([])

	// const fetchPuzzles = async () => {
  //   try {
  //     const puzzleData = await fetch('https://puzzlrs.herokuapp.com/api/v1/puzzles')
  //     const { data } = await puzzleData.json()
	// 		console.log(data)
	// 		// const puzzles = data
  //     // setPuzzles(puzzles.map((puzzle: PuzzleObjectInterface) => {
  //     //   return {
  //     //     id: puzzle.id,
	// 		// 		image: puzzle.attributes.image,
	// 		// 		category: puzzle.attributes.category,
	// 		// 		pieceCount: puzzle.attributes.piece_count,
	// 		// 		missingPieces: puzzle.attributes.missing_pieces,
	// 		// 		availability: puzzle.attributes.availability,
	// 		// 		quality: puzzle.attributes.quality,
	// 		// 		price: puzzle.attributes.original_price_point
  //     //   }
  //     // }))
	// 		console.log('In fetch>>>', puzzles)
	// 		setPuzzles(puzzles)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

	// useEffect(() => {
	// 	fetchPuzzles()
	// 	// console.log('In effect>>>', puzzles)
	// }, [])
	useEffect(() => {
		const fetchData = async() => {
			const puzzleData = await fetch('https://puzzlrs.herokuapp.com/api/v1/puzzles')
			const { data } = await puzzleData.json()
			.catch(error => console.log(error));
			setPuzzles(data)
		}
		fetchData();
	}, [])
 
	return (
		<PuzzleContext.Provider value={{ puzzles }}>
			{children}
		</PuzzleContext.Provider>
	)
}

export { PuzzleContext, PuzzleProvider }