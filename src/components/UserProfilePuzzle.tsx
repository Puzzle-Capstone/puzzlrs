import React from 'react';
import '../css/UserProfilePuzzle.css';
import Modal from 'react-modal';
import RequestDetails from './RequestDetails'
import PuzzleDetails from './PuzzleDetails'
import UserSentRequestDetails from './UserSentRequestDetails'
import { useState, MouseEvent } from 'react'


Modal.setAppElement('#root');

interface IUserPuzzleImage {
  image: string
  category: string
  missingPieces: string 
  price: string 
  pieceCount: string 
  quality: string
  id: number | string 
  type: string
}

const UserProfilePuzzle = ({ image, category, missingPieces, price, pieceCount, quality, id, type }: IUserPuzzleImage) => {

  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (event: MouseEvent) => {
    event.preventDefault()
    setModalOpen(true)
  }

  const closeModal = (event: MouseEvent) => {
    event.preventDefault()
    setModalOpen(false)
  }

  const findCorrectModal = () => {
    if (type === 'user-puzzles' || type === 'sent-requests') {
      return <UserSentRequestDetails 
        closeModal={closeModal} 
        id={id} 
        pieceCount={pieceCount}
        image={image} 
        category={category} 
        quality={quality} 
        missingPieces={missingPieces} 
        price={price}
      />
    } else if (type === 'received-requests') {
        return <RequestDetails 
          closeModal={closeModal} 
          id={id} 
          pieceCount={pieceCount}
          image={image} 
          category={category} 
          quality={quality} 
          missingPieces={missingPieces} 
          price={price}
        />
      } 
  }

  return (
    <section className='puzzle-image'>
      <img className='user-puzzles' src={image} onClick={event => openModal(event)}/>
      <Modal 
        className='Modal'
        overlayClassName="Overlay"
        isOpen={modalOpen}
        contentLabel="Puzzle Modal">
        {findCorrectModal()}
      </Modal>
    </section>
  )
}

export default UserProfilePuzzle;