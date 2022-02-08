import React from "react";
import '../css/PuzzleDetails.css';

interface puzzleDetailsComponent {
  closeModal: (event: React.MouseEvent) => void
  id: string
  pieceCount: string
  image: string
  category: string
  missingPieces: string
  price: string 
  quality: string
}

const PuzzleDetails: React.FC<puzzleDetailsComponent> = ({ closeModal, id, pieceCount, image, category, missingPieces, price, quality }) => {
  console.log('puzzledetails')

  return (
    <section className='puzzle-details'>
      <p>{id}</p>
      <p>{pieceCount}</p>
      <p>{quality}</p>
      <p>{image}</p>
      <p>{category}</p>
      <p>{price}</p>
      <p>{missingPieces}</p>
      <button onClick={event => closeModal(event)}>I am a button</button>
    </section>
  )
}

export default PuzzleDetails;