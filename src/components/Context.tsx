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

const PuzzleProvider: React.FC = props => {
	const [puzzles, setPuzzles] = useState([])

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

	useEffect(() => {
		fetchPuzzles()

	}, [])


	return (
		<PuzzleContext.Provider value={{ puzzles }}>
			{props.children}
		</PuzzleContext.Provider>
	)
}

export { PuzzleContext, PuzzleProvider }