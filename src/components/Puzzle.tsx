import '../css/Puzzle.css';
import Modal from 'react-modal';
import { useState } from 'react'
import React from 'react'
import PuzzleDetails from './PuzzleDetails'
import { IPuzzleProps } from '../interfaces'

Modal.setAppElement('#root');

const Puzzle = ({ id, pieceCount, image, category, quality, missingPieces, price }: IPuzzleProps) => {
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
    <section>
      <div className='individual-puzzle' onClick={(event) => openModal(event)}>
        <img src={image} />
      </div>
      <h4 className='piece-count'>{pieceCount} pieces</h4>
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

export default Puzzle;