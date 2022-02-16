import { useState, useContext } from 'react';
import { PuzzleContext } from '../Context';
import { ICleanedPuzzleObject } from '../interfaces';
import { Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import { categoryOptions, qualityOptions, pieceCountOptions } from "../utils";
import Puzzle from './Puzzle';
import ErrorPage from './ErrorPage';
import '../css/PuzzleContainer.css';

const PuzzleContainer = () => {
  const [category, setCategory] = useState('');
  const [pieceCount, setPieceCount] = useState('');
  const [quality, setQuality] = useState('');
  const [filteredPuzzles, setFilteredPuzzles] = useState<ICleanedPuzzleObject[]>([]);
  const fetchedPuzzles = useContext(PuzzleContext)

  const [categoryList, setCategoryList] = useState<ICleanedPuzzleObject[]>([]);
  const [qualityList, setQualityList] = useState<ICleanedPuzzleObject[]>([]);
  const [pieceCountList, setPieceCountList] = useState<ICleanedPuzzleObject[]>([]);

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

  const filterCategoryPuzzles = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value)
    const categoryPuzzles = fetchedPuzzles.puzzles.filter((puzzle: ICleanedPuzzleObject) => puzzle.category === event.target.value);
    setCategoryList(categoryPuzzles)
  }

  const filterQualityPuzzles = (event: SelectChangeEvent<string>) => {
    setQuality(event.target.value)
    const qualityPuzzles = fetchedPuzzles.puzzles.filter((puzzle: ICleanedPuzzleObject) => puzzle.quality === event.target.value);
    setQualityList(qualityPuzzles)
  }

  const filterPieceCountPuzzles = (event: SelectChangeEvent<string>) => {
    setPieceCount(event.target.value)
    const pieceCountPuzzles = fetchedPuzzles.puzzles.filter((puzzle: ICleanedPuzzleObject) => puzzle.pieceCount === event.target.value);
    setPieceCountList(pieceCountPuzzles)
  }

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
      comboFiltered = uniquePuzzles.filter(puzzle => puzzle.pieceCount === pieceCount && puzzle.quality === quality)
    } else {
      comboFiltered = uniquePuzzles.filter(puzzle => puzzle.category === category && puzzle.pieceCount === pieceCount && puzzle.quality === quality)
    }
    setFilteredPuzzles(comboFiltered)
  }

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

  const renderPuzzleGrid = fetchedPuzzles.error ?
    <div className='flex'>
      <ErrorPage message="We're having issues loading, try again later!" />
    </div> :
    <section className='puzzle-page'>
      <div className='filters'>
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
      </section>
    </section>

  return (
    <>
      {renderPuzzleGrid}
    </>
  )
}

export default PuzzleContainer;