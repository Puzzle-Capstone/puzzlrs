import { useState, useContext } from 'react';
import { Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import { categoryOptions, qualityOptions, pieceCountOptions } from "../utils";
import '../css/PuzzleContainer.css';
import Puzzle from './Puzzle';
import { PuzzleContext } from '../Context';
import { cleanedPuzzleObjectInterface } from '../Context';

const PuzzleContainer = () => {
  const [category, setCategory] = useState('');
  const [pieceCount, setPieceCount] = useState('');
  const [quality, setQuality] = useState('');
  const [range, setRange] = useState<number[]>([]);
  const [filteredPuzzles, setFilteredPuzzles] = useState<cleanedPuzzleObjectInterface[]>([]);
  const fetchedPuzzles = useContext(PuzzleContext)

  const [categoryList, setCategoryList] = useState<cleanedPuzzleObjectInterface[]>([]);
  const [qualityList, setQualityList] = useState<cleanedPuzzleObjectInterface[]>([]);

  const allPuzzles = fetchedPuzzles.puzzles.length && fetchedPuzzles.puzzles.map(puzzle =>
    <Puzzle
      key={puzzle.id}
      id={puzzle.id}
      pieceCount={puzzle.pieceCount}
      image={puzzle.image}
    />
  )

  const filterCategoryPuzzles = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value)
    const categoryPuzzles = fetchedPuzzles.puzzles.filter((puzzle: cleanedPuzzleObjectInterface) => puzzle.category === event.target.value);
    setCategoryList(categoryPuzzles)
    console.log(categoryPuzzles)
  }

  const filterQualityPuzzles = (event: SelectChangeEvent<string>) => {
    setQuality(event.target.value)
    const qualityPuzzles = fetchedPuzzles.puzzles.filter((puzzle: cleanedPuzzleObjectInterface) => puzzle.quality === event.target.value);
    setQualityList(qualityPuzzles)
    console.log(qualityPuzzles)
  }

  const getRange = (event: SelectChangeEvent<string>) => {
    const range = event.target.value
    const ranges = range.split('-') || range.split('+');
    const mappedRanges = ranges.map(range => parseInt(range));
    console.log(mappedRanges)
    setPieceCount(range)
    setRange(mappedRanges)
  }

  const checkIfInRange = () => {
    return fetchedPuzzles.puzzles.filter(puzzle => {
      if (parseInt(puzzle.pieceCount) >= range[0] && parseInt(puzzle.pieceCount) <= range[1]) {
        return puzzle
      } else if (range.length === 1 && parseInt(puzzle.pieceCount) >= range[0]) {
        return puzzle
      }
    })
  }

  const joinPuzzles = () => {
    const inRangePuzzles = checkIfInRange();
    console.log('inRange>>>', inRangePuzzles)
    const jointPuzzles = categoryList.concat(qualityList, inRangePuzzles);
    const uniquePuzzles = jointPuzzles.filter((puzzle, index, jointArr) => jointArr.indexOf(puzzle) === index);
    setFilteredPuzzles(uniquePuzzles);
    setCategoryList([]);
    setQualityList([]);
    setRange([]);
    setCategory('');
    setQuality('');
    setPieceCount('');
    console.log(uniquePuzzles);
  }

  const displayFilteredPuzzles = filteredPuzzles.map(puzzle =>
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
        {/* <h3>Available Puzzles</h3> */}
          <FormControl variant="standard">
            <InputLabel className='input-label'>Category</InputLabel>
            <Select
              className='puzzle-grid-dropdown'
              name='category'
              value={category}
              // onChange={event => filterPuzzles(event)}
              onChange={event => filterCategoryPuzzles(event)}
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
              onChange={event => getRange(event)}
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
              onChange={event => filterQualityPuzzles(event)}
            >
              {qualityOptions}
            </Select>
          </FormControl>
          <button onClick={joinPuzzles}>Search</button>
      </div>
      <section className='puzzles-container'>
        {filteredPuzzles.length ? displayFilteredPuzzles : allPuzzles}
        {/* {allPuzzles} */}
      </section>
    </section>
  )
}

export default PuzzleContainer;