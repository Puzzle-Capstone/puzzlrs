import React from 'react';
import '../css/UserProfilePuzzle.css';
import Modal from 'react-modal';
import UserReceivedRequestModal from './UserReceivedRequestModal'
import UserSentRequestModal from './UserSentRequestModal'
import UserPuzzleModal from './UserPuzzleModal'
import { useState, MouseEvent } from 'react'
import { IUserPuzzleImage } from '../interfaces';

Modal.setAppElement('#root');

const UserProfilePuzzle = ({ image, category, missingPieces, price, pieceCount, quality, id, type, requestID }: IUserPuzzleImage) => {

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
    if (type === 'user-puzzles') {
      return <UserPuzzleModal
        closeModal={closeModal}
        id={id}
        pieceCount={pieceCount}
        image={image}
        category={category}
        quality={quality}
        missingPieces={missingPieces}
        price={price}
      />
    } else if (type === 'sent-requests') {
      return <UserSentRequestModal
        closeModal={closeModal}
        id={id}
        requestID={requestID}
        pieceCount={pieceCount}
        image={image}
        category={category}
        quality={quality}
        missingPieces={missingPieces}
        price={price}
      />
    } else if (type === 'received-requests') {
      return <UserReceivedRequestModal
        closeModal={closeModal}
        id={id}
        requestID={requestID}
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
      <img className='user-puzzles' src={image} onClick={event => openModal(event)} />
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