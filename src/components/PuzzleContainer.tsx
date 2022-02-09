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
    // const filteredPuzzless = !filteredPuzzles.length ? fetchedPuzzles.puzzles.filter((puzzle: cleanedPuzzleObjectInterface) => puzzle[filterBy] === event.target.value) : 
    // filteredPuzzles.filter((puzzle: cleanedPuzzleObjectInterface) => puzzle[filterBy] === event.target.value);
    // setFilteredPuzzles(filteredPuzzless)
  // }
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

  // const parsePieceCount = () => {
  //   // const parsedPuzzles: cleanedPuzzleObjectInterface[] = []
  //   const parsedPuzzles = fetchedPuzzles.puzzles.map((puzzle: cleanedPuzzleObjectInterface) => {
  //     console.log(puzzle.pieceCount);
  //     parseInt(puzzle.pieceCount);
  //     console.log(puzzle.pieceCount);
  //     return parseInt(puzzle.pieceCount);
  //     // parsedPuzzles.push(puzzle)
  //   });
  //   // console.log(parsedPuzzles);
  //   return parsedPuzzles
  // }

  // const filterPieceCountPuzzles = (event: SelectChangeEvent<string>) => {
  //   console.log(event.target.value)
  //   setPieceCount(event.target.value);
  //   // const parsedPuzzles = parsePieceCount()
  //   // console.log('parsedPuzzles>>>>', parsedPuzzles)
  //   // console.log(event.target.value)
  // //   const pieceCountPuzzles = fetchedPuzzles.puzzles.filter((puzzle: cleanedPuzzleObjectInterface) => {
  // //     // parseInt(puzzle.pieceCount);
  // //     let filteredPuzzle: cleanedPuzzleObjectInterface[] = [];
  // //     if (parseInt(puzzle.pieceCount) < 100) {
  // //       filteredPuzzle.push(puzzle)
  // //     }
  // //     // puzzle.pieceCount === event.target.value
      
  // //     return filteredPuzzle
  // //   });
  // //   console.log(pieceCountPuzzles)
  // const pieceCountPuzzles = fetchedPuzzles.puzzles.reduce((list: cleanedPuzzleObjectInterface[], puzzle) => {
  //   console.log(parseInt(puzzle.pieceCount))
  //   if (parseInt(puzzle.pieceCount) < 99) {
  //     list.push(puzzle)
  //   } else if (parseInt(puzzle.pieceCount) > 99 && parseInt(puzzle.pieceCount) < 500) {
  //     list.push(puzzle)
  //   } 
  //   return list
  // }, []);
  // console.log(pieceCountPuzzles)
  // }

  const getRange = (event: string) => {
    const ranges = event.split('-') || event.split('+');
    const mappedRanges = ranges.map(range => parseInt(range));
    // return mappedNumbers;
    setRange(mappedRanges)
  }

  // I want to make the piece count for each puzzle a number
  const joinPuzzles = () => {
    const jointPuzzles = categoryList.concat(qualityList);
    const uniquePuzzles = jointPuzzles.filter((puzzle, index, jointArr) => jointArr.indexOf(puzzle) === index);
    setFilteredPuzzles(uniquePuzzles);
    setCategory('');
    setQuality('');
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
              // onChange={event => filterPieceCountPuzzles(event)}
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