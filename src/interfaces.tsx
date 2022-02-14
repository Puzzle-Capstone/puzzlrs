export interface IPuzzleObject {
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

export interface IUserObject {
		id: string,
		username: string,
		puzzles: IUserPuzzles[],
		sentRequests: IRequests[],
		receivedRequests: IRequests[]
}

export interface ICleanedPuzzleObject {
	id: string
	image: string
	category: string
	pieceCount: string
	missingPieces: string
	availability: boolean
	quality: string
	price: string
}

export interface IPuzzleContext {
	puzzles: ICleanedPuzzleObject[] 
	loggedIn: boolean
	user: IUserObject
	logIn: (user: string) => void
	userID: number | string
  // addPuzzle: (newPuzzle: IPuzzleObject) => void
}

export interface IPuzzleProps {
  closeModal?: (event: React.MouseEvent) => void
  id: string | number 
  pieceCount: string
  image: string
  category: string
  missingPieces: string
  price: string 
  quality: string
}

export interface IUserPuzzleImage {
  image: string
  category: string
  missingPieces: string 
  price: string 
  pieceCount: string
  quality: string
  id: number | string
}

export interface IUserPuzzles {
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

export interface IRequests {
	id: number
	user_id: number
	puzzle_id: number 
	status: string 
	created_at: string
	updated_at: string 
}

export interface IPuzzleProvider {
  children: React.ReactNode
}