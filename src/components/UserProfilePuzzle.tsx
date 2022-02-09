import '../css/UserProfilePuzzle.css';
import Modal from 'react-modal';
import PuzzleDetails from './PuzzleDetails'
import { useState } from 'react'


Modal.setAppElement('#root');

interface UserPuzzleImage {
  image: string
  category: string
  missingPieces: string 
  price: string 
  pieceCount: string 
  quality: string
  id: number | string 
}

const UserProfilePuzzle: React.FC<UserPuzzleImage> = ({ image, category, missingPieces, price, pieceCount, quality, id }) => {

  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (event: React.MouseEvent) => {
    event.preventDefault()
    setModalOpen(true)
  }

  const closeModal = (event: React.MouseEvent) => {
    event.preventDefault()
    setModalOpen(false)
  }

  return (
    <section className='puzzle-image'>
      <img className='user-puzzles' src={image} onClick={event => openModal(event)}/>
      <Modal 
        className='Modal'
        overlayClassName="Overlay"
        isOpen={modalOpen}
        contentLabel="Puzzle Modal">
        <PuzzleDetails closeModal={closeModal} id={id} pieceCount={pieceCount} image={image} category={category} quality={quality} missingPieces={missingPieces} price={price}/>
      </Modal>
    </section>
  )
}

export default UserProfilePuzzle