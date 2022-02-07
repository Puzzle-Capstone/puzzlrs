import UserProfilePuzzle from './UserProfilePuzzle';
import '../css/UserProfile.css';

const UserProfile = () => {

  return (
    <section className='user-profile'>
      <h2>Hi, Kyra!</h2>
      <div className='profile-column-container'>
        <section className='profile-column'>
          <p>Your Puzzles</p>
          <div className='user-puzzles'>
            <UserProfilePuzzle />
          </div>
        </section>
        <section className='profile-column center'>
          <p>Sent Requests</p>
          <div className='user-puzzles'>
            <UserProfilePuzzle />
            <UserProfilePuzzle />
            <UserProfilePuzzle />
            <UserProfilePuzzle />
          </div>
        </section>
        <section className='profile-column'>
          <p>Received Requests</p>
          <div className='user-puzzles'>
            <UserProfilePuzzle />
            <UserProfilePuzzle />
          </div>
        </section>
      </div>
    </section>
  )
}

export default UserProfile;