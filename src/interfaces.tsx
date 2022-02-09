export interface PuzzleObjectInterface {
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

export interface UserObjectInterface {
		id: string,
		username: string,
		puzzles: object[],
		sentRequests: object[],
		receivedRequests:object[]
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
  // can remove line 31 if no switch statement
}

export interface PuzzlesContextInterface {
	puzzles: cleanedPuzzleObjectInterface[] 
	loggedIn: boolean
	logIn: (user: string) => void
}

export interface puzzleProps {
  closeModal?: (event: React.MouseEvent) => void
  id: string
  pieceCount: string
  image: string
  category: string
  missingPieces: string
  price: string 
  quality: string
}

export interface UserPuzzleImage {
  image: string
  category: string
  missingPieces: string 
  price: string 
  pieceCount: string
  quality: string
  id: number | string
}