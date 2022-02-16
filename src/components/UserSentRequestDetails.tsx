import { IoClose } from "react-icons/io5";
import { IPuzzleProps } from '../interfaces'
import { MouseEvent, useContext } from 'react'
import { PuzzleContext } from '../Context';

const UserSentRequestDetails = ({ closeModal, id, pieceCount, image, category, missingPieces, price, quality }: IPuzzleProps) => {

  const { refreshData, user } = useContext(PuzzleContext)

  const deletePuzzle = async () => {
    try {
      const deletedPuzzleData = await fetch('https://puzzlrs.herokuapp.com/api/v1/puzzles/' + id, {
        method: 'DELETE'
      })
      const { data } = await deletedPuzzleData.json()
      refreshData(user.id)
    } catch(err) {
      console.log(err)
    }
  }

  const handlePuzzleDelete = (event: MouseEvent) => {
    deletePuzzle()
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
        <div className='request-buttons'>
          <button className='request-button' onClick={event => handlePuzzleDelete(event)}>Delete</button>
        </div>
      </div>
    </section>
  )
}

export default UserSentRequestDetails;