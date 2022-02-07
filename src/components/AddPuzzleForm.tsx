import React, {useState} from "react";
import { Select, InputLabel, FormControl, TextField, Input, InputAdornment } from "@mui/material";
import { categoryOptions, piecesOptions, qualityOptions } from "../utils";
import '../css/AddPuzzleForm.css'

const AddPuzzleForm = () => {

  const [category, setCategory] = useState('');
  const [missingPieceCount, setMissingPieceCount] = useState('');
  const [price, setPrice] = useState('');
  const [quality, setQuality] = useState('');
  const [size, setSize] = useState('');


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
          <InputLabel id='missing-pieces-select-label'>Missing Pieces</InputLabel>
          <Select
            className='dropdown'
            labelId='missing-pieces-select-label'
            id="missing-pieces-select"
            value={missingPieceCount}
            onChange={event => setMissingPieceCount(event.target.value)}
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
            value={quality}
            onChange={event => setQuality(event.target.value)}
          >
            {qualityOptions}
          </Select>
        </FormControl>
        <TextField
          className='dropdown'
          id="price-select"
          label="Original Price Point"
          type="number"
          variant="standard"
          value={price}
          onChange={event => setPrice(event.target.value)}
        />
        <TextField
          className='dropdown'
          id="piece-count-type-select"
          label="Piece Count"
          type="number"
          variant="standard"
          value={size}
          onChange={event => setSize(event.target.value)}
        />
        <FormControl variant="standard">
          <InputLabel id='piece-count-select-label'>Upload Image</InputLabel>
          <Select
            className='dropdown'
            labelId='piece-count-type-select-label'
            id="piece-count-type-select"
            value={missingPieceCount}
            onChange={event => setMissingPieceCount(event.target.value)}
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