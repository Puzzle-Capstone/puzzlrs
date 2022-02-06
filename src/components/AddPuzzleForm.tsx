import React, {useState} from "react";
import { Select, InputLabel, FormControl, MenuItem } from "@mui/material";
import { categories, missingPieces } from "../utils";
import '../css/AddPuzzleForm.css'

const AddPuzzleForm = () => {

  const [category, setCategory] = useState('');
  const [pieceCount, setPieceCount] = useState('');

  const categoryOptions = categories.map(category => {
    return (
      <MenuItem value={category} key={category}>{category}</MenuItem>
    )
  })

  const piecesOptions = missingPieces.map(missingPiece => {
    return (
      <MenuItem value={missingPiece} key={missingPiece}>{missingPiece}</MenuItem>
    )
  })

  return (
    <section className='form-container'>
      <form>
        <h3>Submit your puzzle</h3>
        <FormControl variant="standard">
          <InputLabel id='category-type-select-label'>Category</InputLabel>
          <Select
            className='dropdown'
            labelId='category-type-select-label'
            id="category-type-select"
            value={category}
            onChange={event => setCategory(event.target.value)}
            >
            {categoryOptions}
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel id='piece-count-select-label'>Missing Pieces</InputLabel>
          <Select
            className='dropdown'
            labelId='piece-count-type-select-label'
            id="piece-count-type-select"
            value={pieceCount}
            onChange={event => setPieceCount(event.target.value)}
          >
            {piecesOptions}
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel id='piece-count-select-label'>Price</InputLabel>
          <Select
            className='dropdown'
            labelId='piece-count-type-select-label'
            id="piece-count-type-select"
            value={pieceCount}
            onChange={event => setPieceCount(event.target.value)}
          >
            {piecesOptions}
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel id='piece-count-select-label'>Quality</InputLabel>
          <Select
            className='dropdown'
            labelId='piece-count-type-select-label'
            id="piece-count-type-select"
            value={pieceCount}
            onChange={event => setPieceCount(event.target.value)}
          >
            {piecesOptions}
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel id='piece-count-select-label'>Size (piece count)</InputLabel>
          <Select
            className='dropdown'
            labelId='piece-count-type-select-label'
            id="piece-count-type-select"
            value={pieceCount}
            onChange={event => setPieceCount(event.target.value)}
          >
            {piecesOptions}
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel id='piece-count-select-label'>Upload Image</InputLabel>
          <Select
            className='dropdown'
            labelId='piece-count-type-select-label'
            id="piece-count-type-select"
            value={pieceCount}
            onChange={event => setPieceCount(event.target.value)}
          >
            {piecesOptions}
          </Select>
        </FormControl>
        <button className="submit-button">Submit</button>
      </form>
    </section>
  )
}

export default AddPuzzleForm;