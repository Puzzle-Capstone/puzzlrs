import { useState, useContext } from 'react';
import { Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import { categoryOptions, qualityOptions, pieceCountOptions } from "../utils";
import '../css/PuzzleContainer.css';
import Puzzle from './Puzzle';
import { PuzzleContext } from '../Context';
import { ICleanedPuzzleObject } from '../interfaces';

const PuzzleContainer = () => {
  const [category, setCategory] = useState('');
  const [pieceCount, setPieceCount] = useState('');
  const [quality, setQuality] = useState('');
  const [filteredPuzzles, setFilteredPuzzles] = useState<ICleanedPuzzleObject[]>([]);
  const fetchedPuzzles = useContext(PuzzleContext)

  const allPuzzles = fetchedPuzzles.puzzles.length && fetchedPuzzles.puzzles.map(puzzle =>
    <Puzzle
      key={puzzle.id}
      id={puzzle.id}
      pieceCount={puzzle.pieceCount}
      image={puzzle.image}
      missingPieces={puzzle.missingPieces}
      category={puzzle.category}
      price={puzzle.price}
      quality={puzzle.quality}
    />
  )

  // const filterPuzzles = (event: SelectChangeEvent<string>) => {
  //   console.log(event.target)
  //   let filterBy: string = event.target.name
  //   switch (filterBy) {
  //     case 'category':
  //       setCategory(event.target.value)
  //       filterBy = 'category'
  //       break;
  //     case 'pieceCount':
  //       setPieceCount(event.target.value)
  //       filterBy = 'pieceCount'
  //       break;
  //     case 'quality':
  //       setQuality(event.target.value)
  //       console.log(quality)
  //       filterBy = 'quality'
  //       break;
  //   }
  //   const filteredPuzzless = !filteredPuzzles.length ? fetchedPuzzles.puzzles.filter((puzzle: ICleanedPuzzleObject) => puzzle[filterBy] === event.target.value) : 
  //   filteredPuzzles.filter((puzzle: ICleanedPuzzleObject) => puzzle[filterBy] === event.target.value);
  //   setFilteredPuzzles(filteredPuzzless)
  // }

  const displayFilteredPuzzles = filteredPuzzles.map(puzzle =>
    <Puzzle
      key={puzzle.id}
      id={puzzle.id}
      pieceCount={puzzle.pieceCount}
      image={puzzle.image}
      missingPieces={puzzle.missingPieces}
      category={puzzle.category}
      price={puzzle.price}
      quality={puzzle.quality}
    />
  )

  return (
    <section className='puzzle-page'>
      <div className='filters'>
        {/* <h3>Available Puzzles</h3> */}
          <FormControl variant="standard">
            <InputLabel className='input-label'>Category</InputLabel>
            <Select
              className='puzzle-grid-dropdown'
              name='category'
              value={category}
              // onChange={event => filterPuzzles(event)}
            >
              {categoryOptions}
            </Select>
          </FormControl>
          <FormControl variant="standard">
            <InputLabel className='input-label'>Piece Count</InputLabel>
            <Select
              className='puzzle-grid-dropdown'
              name='pieceCount'
              value={pieceCount}
              // onChange={event => filterPuzzles(event)}
            >
              {pieceCountOptions}
            </Select>
          </FormControl>
          <FormControl variant="standard">
            <InputLabel className='input-label'>Quality</InputLabel>
            <Select
              className='puzzle-grid-dropdown'
              name='quality'
              value={quality}
              // onChange={event => filterPuzzles(event)}
            >
              {qualityOptions}
            </Select>
          </FormControl>
      </div>
      <section className='puzzles-container'>
        {filteredPuzzles.length ? displayFilteredPuzzles : allPuzzles}
        {/* {allPuzzles} */}
      </section>
    </section>
  )
}

export default PuzzleContainer;