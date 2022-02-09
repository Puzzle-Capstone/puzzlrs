import UserProfilePuzzle from './UserProfilePuzzle';
import '../css/UserProfile.css';
import { useContext } from 'react'
import { PuzzleContext } from '../Context';

const UserProfile = () => {
  const { user, puzzles } = useContext(PuzzleContext)
  console.log(user)
  console.log(puzzles)

  const displayUserPuzzles =
  user.puzzles.map(puzzle => {
    return <UserProfilePuzzle 
      image={puzzle.image}
      key={puzzle.id}
    />
  })

  // const displaySentRequests = 
  //   user.sentRequests.length && user.sentRequests.map(request => {
  //   const image = findPuzzleImage(request.id.toString())
  //     <UserProfilePuzzle 
  //       image={image}
  //     />
  //   })
  
  // const displayReceivedRequests = 
  //    user.receivedRequests.map(request => {
  //     <UserProfilePuzzle 
  //       image={request.image}
  //     />
  //   })

    // const findPuzzleImage = (puzzleId: string) => {
    //   return puzzles.find(puzzle =>  puzzle.id === puzzleId)
    //  }
  

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