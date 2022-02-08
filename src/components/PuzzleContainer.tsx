import { useState, useContext } from 'react';
import { Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import { categoryOptions, qualityOptions, pieceCountOptions } from "../utils";
import '../css/PuzzleContainer.css';
import Puzzle from './Puzzle';
import { PuzzleContext } from '../Context';

const PuzzleContainer = () => {
  const [category, setCategory] = useState('');
  const [pieceCount, setPieceCount] = useState('');
  const [quality, setQuality] = useState('');
  // const [filteredPuzzles, setFilteredPuzzles] = useState([]);
  const fetchedPuzzles = useContext(PuzzleContext)

  const allPuzzles = fetchedPuzzles.puzzles.length && fetchedPuzzles.puzzles.map(puzzle =>
    <Puzzle
      key={puzzle.id}
      id={puzzle.id}
      pieceCount={puzzle.pieceCount}
      image={puzzle.image}
    />
  )

  const filterPuzzles = (event: SelectChangeEvent<string>) => {
    // const filterBy = event.target
    // switch (filterBy) {
    //   case 'category':
    //     setCategory(event.target.value)
    //     filterBy = 'category'
    //     break;
    //   case 'pieceCount':
    //     setPieceCount(event.target.value)
    //     break;
    //   case 'quality':
    //     setQuality(event.target.value)
    //     break;
    // }
    // const filteredPuzzles = fetchedPuzzles.puzzles.filter(puzzle => puzzle[filterBy] === filterBy.value)

    setCategory(event.target.value)
    const filteredPuzzles = fetchedPuzzles.puzzles.filter(puzzle => puzzle.category === event.target.value)
    console.log(filteredPuzzles)
    // setFilteredPuzzles(filteredPuzzles)
  }

  // const displayFilteredPuzzles = filteredPuzzles.map(puzzle =>
  //   <Puzzle
  //     key={puzzle.id}
  //     id={puzzle.id}
  //     pieceCount={puzzle.pieceCount}
  //     image={puzzle.image}
  //   />
  // )

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
              onChange={event => filterPuzzles(event)}
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
              onChange={event => setPieceCount(event.target.value)}
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
              onChange={event => setQuality(event.target.value)}
            >
              {qualityOptions}
            </Select>
          </FormControl>
      </div>
      <section className='puzzles-container'>
        {/* {filteredPuzzles.length ? displayFilteredPuzzles : allPuzzles} */}
        {allPuzzles}
      </section>
    </section>
  )
}

export default PuzzleContainer;