import React from "react";
import '../css/Puzzle.css';
import PuzzleDetails from '../components/PuzzleDetails'

interface puzzleInfo {
  id: string
  category: string
  missingPieces: string
  price: string
  quality: string
  size: string
  image: string
}

const Puzzle: React.FC<puzzleInfo> = ({ id, category, missingPieces, price, quality, size, image }) => {

  return (
    <section>
      <div className='individual-puzzle' onClick={() => console.log(id)}>
        <img src={image}/>
      </div>
      <h4 className='piece-count'>{size} pieces</h4>
    </section>
  )
}

export default Puzzle;