import React from "react";
import '../css/PuzzleDetails.css';

interface puzzleDetails {
  id: number
  catagory: string
  missingPieces: number
  price: number
  quality: string
  size: number
  image: string
}

const PuzzleDetails: React.FC<puzzleDetails> = ({ id, catagory, missingPieces, price, quality, size, image }) => {

  return (
    <section className='individual-puzzle'>
      <p>{id}</p>
      <p>{catagory}</p>
      <p>{missingPieces}</p>
      <p>{price}</p>
      <p>{quality}</p>
      <p>{size}</p>
      <p>{image}</p>
    </section>
  )
}

export default PuzzleDetails;