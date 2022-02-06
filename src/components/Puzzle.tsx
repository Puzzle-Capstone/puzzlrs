import React from "react";
import '../css/Puzzle.css';
import PuzzleDetails from '../components/PuzzleDetails'

interface puzzleInfo {
  id: number
  catagory: string
  missingPieces: number
  price: number
  quality: string
  size: number
  image: string
}

const Puzzle: React.FC<puzzleInfo> = ({ id, catagory, missingPieces, price, quality, size, image }) => {

  return (
    <section>
      <div className='individual-puzzle' onClick={() => console.log(id)}>

      </div>
      <h4 className='piece-count'>{size} pieces</h4>
    </section>
  )
}

export default Puzzle;