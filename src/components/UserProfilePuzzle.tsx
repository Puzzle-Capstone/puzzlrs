import '../css/UserProfilePuzzle.css';

interface UserPuzzleImage {
  image: string
}

const UserProfilePuzzle: React.FC<UserPuzzleImage> = ({ image }) => {
  return (
    <section className='puzzle-image'>
      <img src={image}/>
    </section>
  )
}

export default UserProfilePuzzle