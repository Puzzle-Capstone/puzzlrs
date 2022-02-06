import React from 'react';
import PuzzleDetails from "./PuzzleDetails";
import '../css/PuzzleContainer.css';
import Puzzle from './Puzzle';

const PuzzleContainer = () => {

  const dumbieData = [{ id: 1, catagory: 'easy', missingPieces: 1, price: 15, quality: 'good', size: 500, image: 'url' },
  {id: 2, catagory: 'easy', missingPieces: 1, price: 15, quality: 'good', size: 500, image: 'url' },
  {id: 3, catagory: 'easy', missingPieces: 1, price: 15, quality: 'good', size: 500, image: 'url' },
  {id: 4, catagory: 'easy', missingPieces: 1, price: 15, quality: 'good', size: 500, image: 'url' },
  {id: 5, catagory: 'easy', missingPieces: 1, price: 15, quality: 'good', size: 500, image: 'url' },
  {id: 6, catagory: 'easy', missingPieces: 1, price: 15, quality: 'good', size: 500, image: 'url' }]

  const puzzles = dumbieData.map(puzzle => 
    <PuzzleDetails 
      catagory={puzzle.catagory}
      missingPieces={puzzle.missingPieces}
      price={puzzle.price}
      quality={puzzle.quality}
      size={puzzle.size}
      image={puzzle.image}
      key={puzzle.id}
      id={puzzle.id}
    />)

  return (
    <section className='puzzles-container'>
      {puzzles}
    </section>
  )
}

export default PuzzleContainer;