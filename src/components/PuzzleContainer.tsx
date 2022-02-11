import { useState, useContext } from 'react';
import { Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import { categoryOptions, qualityOptions, pieceCountOptions } from "../utils";
import '../css/PuzzleContainer.css';
import Puzzle from './Puzzle';
import { PuzzleContext } from '../Context';
import { cleanedPuzzleObjectInterface, PuzzlesContextInterface } from '../Context';

const PuzzleContainer = () => {
  const [category, setCategory] = useState('');
  const [pieceCount, setPieceCount] = useState('');
  const [quality, setQuality] = useState('');
  const [filteredPuzzles, setFilteredPuzzles] = useState<cleanedPuzzleObjectInterface[]>([]);
  const fetchedPuzzles = useContext(PuzzleContext)

  const [categoryList, setCategoryList] = useState<cleanedPuzzleObjectInterface[]>([]);
  const [qualityList, setQualityList] = useState<cleanedPuzzleObjectInterface[]>([]);
  const [pieceCountList, setPieceCountList] = useState<cleanedPuzzleObjectInterface[]>([]);

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
    console.log(categoryPuzzles, 'category puzzles')
  }

  const filterQualityPuzzles = (event: SelectChangeEvent<string>) => {
    setQuality(event.target.value)
    const qualityPuzzles = fetchedPuzzles.puzzles.filter((puzzle: cleanedPuzzleObjectInterface) => puzzle.quality === event.target.value);
    setQualityList(qualityPuzzles)
    console.log(qualityPuzzles, 'quality puzzles')
  }

  const filterPieceCountPuzzles = (event: SelectChangeEvent<string>) => {
    setPieceCount(event.target.value)
    const pieceCountPuzzles = fetchedPuzzles.puzzles.filter((puzzle: cleanedPuzzleObjectInterface) => puzzle.pieceCount === event.target.value);
    setPieceCountList(pieceCountPuzzles)
    console.log(pieceCountPuzzles, 'piece count puzzles')
  }

  // const filterPieceCountPuzzles = (event: SelectChangeEvent<string>) => {
  //   setPieceCount(event.target.value)
  //   const pieceCountRange = event.target.value
  //   const rangeNumbers = pieceCountRange.split('-').map(number => parseInt(number)) || pieceCountRange.split('+').map(number => parseInt(number));
  //   const pieceCountPuzzles = fetchedPuzzles.puzzles.filter(puzzle => {
  //     if (parseInt(puzzle.pieceCount) >= rangeNumbers[0] && parseInt(puzzle.pieceCount) <= rangeNumbers[1]) {
  //       return puzzle
  //     } else if (rangeNumbers.length === 1 && parseInt(puzzle.pieceCount) >= rangeNumbers[0]) {
  //       return puzzle
  //     }
  //   })
  //   setPieceCountList(pieceCountPuzzles)
  //   console.log(pieceCountPuzzles, 'piece count puzzles')
  // }

  const handleSearch = () => {
    const allFilteredPuzzles = categoryList.concat(qualityList, pieceCountList)
    const uniquePuzzles = allFilteredPuzzles.filter((puzzle, index, jointArr) => jointArr.indexOf(puzzle) === index);
    let comboFiltered;
    if (category && !quality && !pieceCount) {
      comboFiltered = categoryList
    } else if (quality && !category && !pieceCount) {
      comboFiltered = qualityList
    } else if (pieceCount && !category && !quality) {
      comboFiltered = pieceCountList
    } else if (category && quality && !pieceCount) {
      comboFiltered = uniquePuzzles.filter(puzzle => puzzle.category === category && puzzle.quality === quality)
    } else if (category && pieceCount && !quality) {
      comboFiltered = uniquePuzzles.filter(puzzle => puzzle.category === category && puzzle.pieceCount === pieceCount)
    } else if (pieceCount && quality && !category) {
      comboFiltered = uniquePuzzles.filter(puzzle => puzzle.category === category && puzzle.quality === quality)
    } else {
      comboFiltered = uniquePuzzles.filter(puzzle => puzzle.category === category && puzzle.pieceCount === pieceCount && puzzle.quality === quality )
    }
    setFilteredPuzzles(comboFiltered)
    }


    // const joinPuzzles = () => {
    //   const inRangePuzzles = checkIfInRange();
    //   console.log('inRange>>>', inRangePuzzles)
    //   const jointPuzzles = categoryList.concat(qualityList, inRangePuzzles);
    //   const uniquePuzzles = jointPuzzles.filter((puzzle, index, jointArr) => jointArr.indexOf(puzzle) === index);
    //   setFilteredPuzzles(uniquePuzzles);
    //   setCategoryList([]);
    //   setQualityList([]);
    //   setRange([]);
    //   setCategory('');
    //   setQuality('');
    //   setPieceCount('');
    //   console.log(uniquePuzzles);
    // }

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
              onChange={event => filterPieceCountPuzzles(event)}
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
              onChange={event => filterQualityPuzzles(event)}
            >
              {qualityOptions}
            </Select>
          </FormControl>
          <button onClick={handleSearch}>Search</button>
        </div>
        <section className='puzzles-container'>
          {filteredPuzzles.length ? displayFilteredPuzzles : allPuzzles}
          {/* {allPuzzles} */}
        </section>
      </section>
    )
  }

  export default PuzzleContainer;