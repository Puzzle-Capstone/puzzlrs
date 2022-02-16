import UserProfilePuzzle from './UserProfilePuzzle';
import '../css/UserProfile.css';
import { useContext } from 'react'
import { PuzzleContext } from '../Context';

const UserProfile = () => {
  const { user, puzzles } = useContext(PuzzleContext)

  const displayUserPuzzles =
    user.puzzles.map(puzzle => {
      return <UserProfilePuzzle
        id={puzzle.id}
        requestID={puzzle.id}
        image={puzzle.image}
        key={puzzle.id}
        category={puzzle.category}
        missingPieces={puzzle.missing_pieces}
        price={puzzle.original_price_point}
        pieceCount={puzzle.piece_count}
        quality={puzzle.quality}
        type='user-puzzles'
      />
    })

  const findPuzzleImage = (puzzleId: number) => {
    return puzzles.find(puzzle => puzzle.id === puzzleId.toString())
  }

  const displaySentRequests =
    user.sentRequests.map((request, index) => {
      const foundPuzzle = findPuzzleImage(request.puzzle_id)
      return foundPuzzle && <UserProfilePuzzle
        id={foundPuzzle.id}
        image={foundPuzzle.image}
        requestID={request.id}
        key={index}
        category={foundPuzzle.category}
        missingPieces={foundPuzzle.missingPieces}
        price={foundPuzzle.price}
        pieceCount={foundPuzzle.pieceCount}
        quality={foundPuzzle.quality}
        type='sent-requests'
      />
    })

  const displayReceivedRequests =
    user.receivedRequests.map((request, index) => {
      const foundPuzzle = findPuzzleImage(request.puzzle_id)
      return foundPuzzle && <UserProfilePuzzle
        id={foundPuzzle.id}
        image={foundPuzzle.image}
        requestID={request.id}
        key={index}
        category={foundPuzzle.category}
        missingPieces={foundPuzzle.missingPieces}
        price={foundPuzzle.price}
        pieceCount={foundPuzzle.pieceCount}
        quality={foundPuzzle.quality}
        type='received-requests'
      />
    })

  return (
    <section className='user-profile'>
      <h2>{`Hi, ${user.username}!`}</h2>
      <div className='profile-column-container'>
        <section className='profile-column'>
          <p>Your Puzzles</p>
          <div className='user-puzzle-container'>
            {displayUserPuzzles}
          </div>
        </section>
        <section className='profile-column center'>
          <p>Your Sent Requests</p>
          <div className='user-puzzle-container'>
            {displaySentRequests}
          </div>
        </section>
        <section className='profile-column'>
          <p>Received Requests</p>
          <div className='user-puzzle-container'>
            {displayReceivedRequests}
          </div>
        </section>
      </div>
    </section>
  )
}

export default UserProfile;