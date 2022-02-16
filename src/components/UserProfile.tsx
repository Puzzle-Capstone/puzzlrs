import { useContext } from 'react'
import { PuzzleContext } from '../Context';
import UserProfilePuzzle from './UserProfilePuzzle';
import ErrorPage from './ErrorPage';
import '../css/UserProfile.css';

const UserProfile = () => {
  const { user, puzzles } = useContext(PuzzleContext)

  const findPuzzleImage = (puzzleId: number) => {
    return puzzles.find(puzzle => puzzle.id === puzzleId.toString())
  }

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

    const renderUserProfile = user.username ? 
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
    </section> : 
    <div className='flex'>
      <ErrorPage message='You are not logged in! Click above or return home.'/>
    </div>

  return (
    <>
    {renderUserProfile}
    </>
  )
}

export default UserProfile;