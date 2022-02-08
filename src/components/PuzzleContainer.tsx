import { useState, useContext } from 'react';
import { Select, InputLabel, FormControl } from "@mui/material";
import { categoryOptions, qualityOptions, pieceCountOptions } from "../utils";
import '../css/PuzzleContainer.css';
import Puzzle from './Puzzle';
import { PuzzleContext } from '../Context';

const PuzzleContainer = () => {
  const [category, setCategory] = useState('');
  const [pieceCount, setPieceCount] = useState('');
  const [quality, setQuality] = useState('');
  const fetchedPuzzles = useContext(PuzzleContext)

  const allPuzzles = fetchedPuzzles.puzzles.length && fetchedPuzzles.puzzles.map(puzzle =>
    <Puzzle
      key={puzzle.id}
      id={puzzle.id}
      pieceCount={puzzle.pieceCount}
      image={puzzle.image}
    />
  )

  return (
    <section className='puzzle-page'>
      <div className='filters'>
        <h3>Filter Puzzles</h3>
        <div>
          <FormControl variant="standard">
            <InputLabel>Category</InputLabel>
            <Select
              className='puzzle-grid-dropdown'
              value={category}
              onChange={event => setCategory(event.target.value)}
            >
              {categoryOptions}
            </Select>
          </FormControl>
          <FormControl variant="standard">
            <InputLabel>Piece Count</InputLabel>
            <Select
              className='puzzle-grid-dropdown'
              value={pieceCount}
              onChange={event => setPieceCount(event.target.value)}
            >
              {pieceCountOptions}
            </Select>
          </FormControl>
          <FormControl variant="standard">
            <InputLabel>Quality</InputLabel>
            <Select
              className='puzzle-grid-dropdown'
              value={quality}
              onChange={event => setQuality(event.target.value)}
            >
              {qualityOptions}
            </Select>
          </FormControl>
        </div>
      </div>
      <section className='puzzles-container'>
        {allPuzzles}
      </section>
    </section>
  )
}

export default PuzzleContainer;