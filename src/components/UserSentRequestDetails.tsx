import { IoClose } from "react-icons/io5";
import { IPuzzleProps } from '../interfaces'
import { MouseEvent, useEffect, useContext } from 'react'
import { PuzzleContext } from '../Context';

const UserSentRequestDetails = ({ closeModal, id, pieceCount, image, category, missingPieces, price, quality }: IPuzzleProps) => {

  const { fetchPuzzles } = useContext(PuzzleContext)

  const deletePuzzle = () => {
    fetch('https://puzzlrs.herokuapp.com/api/v1/puzzles/' + id, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => fetchPuzzles())
      .then(res => console.log(res))
      .catch(err => console.log(err, 'error message'))
  }

  const handlePuzzleDelete = (event: MouseEvent) => {
    deletePuzzle()
    closeModal?.(event)
  }

  console.log('sent request modal')
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
        <div className='request-buttons'>
          <button className='request-button' onClick={event => handlePuzzleDelete(event)}>Delete</button>
        </div>
      </div>
    </section>
  )
}

export default UserSentRequestDetails;