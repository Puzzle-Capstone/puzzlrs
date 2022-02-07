import React, { useEffect, useState } from 'react';
import { Select, InputLabel, FormControl, TextField, Input, InputAdornment } from "@mui/material";
import { categoryOptions, piecesOptions, qualityOptions, pieceCountOptions } from "../utils";
import '../css/PuzzleContainer.css';
import Puzzle from './Puzzle';


const PuzzleContainer = () => {
  const [category, setCategory] = useState('');
  const [pieceCount, setPieceCount] = useState('');
  const [quality, setQuality] = useState('');


  const dumbieData = [{ id: 1, catagory: 'easy', missingPieces: 1, price: 15, quality: 'good', size: 500, image: 'url' },
  { id: 2, catagory: 'easy', missingPieces: 1, price: 15, quality: 'good', size: 500, image: 'url' },
  { id: 3, catagory: 'easy', missingPieces: 1, price: 15, quality: 'good', size: 1000, image: 'url' },
  { id: 4, catagory: 'easy', missingPieces: 1, price: 15, quality: 'good', size: 1200, image: 'url' },
  { id: 5, catagory: 'easy', missingPieces: 1, price: 15, quality: 'good', size: 800, image: 'url' },
  { id: 6, catagory: 'easy', missingPieces: 1, price: 15, quality: 'good', size: 1500, image: 'url' }]

  const puzzles = dumbieData.map(puzzle =>

    <Puzzle
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
        {puzzles}
      </section>
    </section>
  )
}

export default PuzzleContainer;