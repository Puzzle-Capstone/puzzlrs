import React from "react";
import '../css/PuzzleDetails.css';
import { IoClose } from "react-icons/io5";
import { puzzleProps } from '../interfaces'

const PuzzleDetails: React.FC<puzzleProps> = ({ closeModal, id, pieceCount, image, category, missingPieces, price, quality }) => {

  return (
    <section className='puzzle-details'>
      <div className='individual-puzzle-details'>
        <div className='puzzle-image-pieces'>
          <img className='puzzle-detail-image' src={image} alt={category + 'puzzle'}/>
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
        <IoClose size={70} onClick={event => closeModal?.(event)}/>
        <button className='submit-button'>Request Puzzle</button>
      </div>
    </section>
  )
}

export default PuzzleDetails;