import { IoClose } from "react-icons/io5";
import { IPuzzleProps } from '../interfaces'

const UserSentRequestDetails = ({ closeModal, id, pieceCount, image, category, missingPieces, price, quality }: IPuzzleProps) => {

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
        <IoClose className='x-icon' size={70} onClick={event => closeModal?.(event)}/>
				<div className='request-buttons'>
					<button className='request-button'>Delete</button>
				</div>
      </div>
    </section>
  )
}

export default UserSentRequestDetails;