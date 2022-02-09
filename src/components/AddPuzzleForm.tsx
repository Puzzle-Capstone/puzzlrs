import React, { useState } from "react";
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
          <InputLabel>Category</InputLabel>
          <Select
            className='dropdown'
            value={category}
            onChange={event => setCategory(event.target.value)}
          >
            {categoryOptions}
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel>Missing Pieces</InputLabel>
          <Select
            className='dropdown'
            value={missingPieceCount}
            onChange={event => setMissingPieceCount(event.target.value)}
          >
            {piecesOptions}
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel>Quality</InputLabel>
          <Select
            className='dropdown'
            value={quality}
            onChange={event => setQuality(event.target.value)}
          >
            {qualityOptions}
          </Select>
        </FormControl>
        <TextField
          className='dropdown'
          label="Original Price Point"
          type="number"
          variant="standard"
          value={price}
          onChange={event => setPrice(event.target.value)}
        />
        <TextField
          className='dropdown'
          label="Piece Count"
          type="number"
          variant="standard"
          value={size}
          onChange={event => setSize(event.target.value)}
        />
        <FormControl variant="standard">
          <InputLabel>Upload Image</InputLabel>
          <Select
            className='dropdown'
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