import React from "react";
import '../css/PuzzleDetails.css';
import { IoClose } from "react-icons/io5";
import { IPuzzleProps } from '../interfaces'
import { MouseEvent, useContext } from 'react'
import { PuzzleContext } from "../Context";

const PuzzleDetails = ({ closeModal, id, pieceCount, image, category, missingPieces, price, quality }: IPuzzleProps) => {
  const { requestPuzzle, refreshData, user } = useContext(PuzzleContext);

  const handleRequestPuzzle = (event: MouseEvent) => {
    requestPuzzle(id)
    refreshData(user.id)
    closeModal?.(event)
  }

  return (
    <section className='puzzle-details'>
      <div className='individual-puzzle-details'>
        <div className='puzzle-image-pieces'>
          <img className='puzzle-detail-image' src={image} alt={category + 'puzzle'} />
          <h4>{pieceCount} pieces</h4>
        </div>
        <div>
          <div className='paragraphs'>
            <p className='bold'>Quality: </p>
            <p>{quality}</p>
          </div>
          <div className='paragraphs'>
            <p className='bold'>Category: </p>
            <p>{category}</p>
          </div>
          <div className='paragraphs'>
            <p className='bold'>Original Price Point: </p>
            <p>{price}</p>
          </div>
          <div className='paragraphs'>
            <p className='bold'>Missing Pieces: </p>
            <p>{missingPieces}</p>
          </div>
        </div>
      </div>
      <div className='button-icon-flex'>
        <IoClose className='x-icon' size={70} onClick={event => closeModal?.(event)} />
        <button className='submit-button' onClick={event => handleRequestPuzzle(event)}>Request Puzzle</button>
      </div>
    </section>
  )
}

export default PuzzleDetails;