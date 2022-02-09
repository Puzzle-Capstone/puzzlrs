import UserProfilePuzzle from './UserProfilePuzzle';
import '../css/UserProfile.css';
import { useContext } from 'react'
import { PuzzleContext } from '../Context';
import { UserPuzzles } from '../Context'

const UserProfile = () => {
  const { user, puzzles } = useContext(PuzzleContext)
  console.log(user)
  console.log(puzzles)

  const displayUserPuzzles =
  user.puzzles.map(puzzle => {
    return <UserProfilePuzzle 
      id={puzzle.id}
      image={puzzle.image}
      key={puzzle.id}
      category={puzzle.category}
      missingPieces={puzzle.missing_pieces}
      price={puzzle.original_price_point}
      pieceCount={puzzle.piece_count}
      quality={puzzle.quality}
    />
  })

  const findPuzzleImage = (puzzleId: number) => {
    return puzzles.find(puzzle =>  puzzle.id === puzzleId.toString())
   }

  // const displaySentRequests = 
  //   user.sentRequests.length && user.sentRequests.map(request => {
  //   const foundPuzzle: UserPuzzles = findPuzzleImage(request.id)
  //     return <UserProfilePuzzle 
  //       id={foundPuzzle.id}
  //       image={foundPuzzle.image}
  //       key={foundPuzzle.id}
  //       category={foundPuzzle.category}
  //       missingPieces={foundPuzzle.missing_pieces}
  //       price={foundPuzzle.original_price_point}
  //       pieceCount={foundPuzzle.piece_count}
  //       quality={foundPuzzle.quality}
  //     />
  //   })
  
  // const displayReceivedRequests = 
  //    user.receivedRequests.map(request => {
  //     <UserProfilePuzzle 
  //       image={request.image}
  //     />
  //   })

  
  

  return (
    <section className='user-profile'>
      <h2>{'Hi, '+ user.username + '!'}</h2>
      <div className='profile-column-container'>
        <section className='profile-column'>
          <p>Your Puzzles</p>
          <div className='user-puzzle-container'>
            {displayUserPuzzles}
          </div>
        </section>
        <section className='profile-column center'>
          <p>Sent Requests</p>
          <div className='user-puzzle-container'>
           {/* {displaySentRequests} */}
          </div>
        </section>
        <section className='profile-column'>
          <p>Received Requests</p>
          <div className='user-puzzle-container'>
            {/* {displayReceivedRequests} */}
          </div>
        </section>
      </div>
    </section>
  )
}

export default UserProfile;