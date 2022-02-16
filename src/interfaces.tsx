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
	refreshData: (id: string) => void
	puzzles: ICleanedPuzzleObject[] 
	loggedIn: boolean
	user: IUserObject
	logIn: (user: string) => void
	requestPuzzle: (id: string | number) => void
	updatePuzzleStatus: (status: string, requestID: number | undefined) => void
}


export interface ThemeOptions {
	status?: {
		danger?: string;
	};
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
	requestID?: number
}

export interface IUserPuzzleImage {
  image: string
  category: string
  missingPieces: string 
  price: string 
  pieceCount: string
  quality: string
  id: number | string
	type?: string
	requestID: number
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