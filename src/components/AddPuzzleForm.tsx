import React, { useState, MouseEvent, useContext } from 'react';
import { Select, InputLabel, FormControl, TextField, Input, InputAdornment, FormHelperText } from '@mui/material';
import { categoryOptions, piecesOptions, qualityOptions } from '../utils';
import { ICleanedPuzzleObject } from '../interfaces';
import { PuzzleContext } from '../Context';
import '../css/AddPuzzleForm.css'

const AddPuzzleForm = () => {
  const { addPuzzle } = useContext(PuzzleContext)

  const [category, setCategory] = useState('');
  const [missingPieceCount, setMissingPieceCount] = useState('');
  const [price, setPrice] = useState('');
  const [quality, setQuality] = useState('');
  const [pieceCount, setPieceCount] = useState('');

  const [categoryHasError, setCategoryHasError] = useState(false);
  const [missingPiecesHasError, setMissingPiecesHasError] = useState(false);
  const [qualityHasError, setQualityHasError] = useState(false);
  const [priceHasError, setPriceHasError] = useState(false);
  const [pieceCountHasError, setPieceCountHasError] = useState(false);

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    checkIfErrors();
    if(category !== '' && missingPieceCount !== '' && price !== '' && quality !== '' && pieceCount !== '') {
      const newPuzzle: ICleanedPuzzleObject = {
        id: Date.now().toString(),
        category: category,
        missingPieces: missingPieceCount,
        pieceCount: pieceCount,
        quality: quality,
        availability: true,
        price: price,
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2020-04/28/14/asset/1593bcadc012/sub-buzz-488-1588084568-26.jpg'
      }
      clearInputs();
      addPuzzle(newPuzzle);
      console.log(newPuzzle)
    } 
  }

  const checkIfErrors = () => {
      if(category === '' && !categoryHasError) {
        setCategoryHasError(true)
      }
      if(missingPieceCount === '' && !missingPiecesHasError) {
        setMissingPiecesHasError(true)
      }
      if(quality === '' && !qualityHasError) {
        setQualityHasError(true)
      }
      if(price === '' && !priceHasError) {
        setPriceHasError(true)
      }
      if(pieceCount === '' && !pieceCountHasError) {
        setPieceCountHasError(true)
      }
  }

  const clearInputs = () => {
    setCategory('');
    setMissingPieceCount('');
    setQuality('');
    setPrice('');
    setPieceCount('');
  }

  return (
    <section className='form-container'>
      <form>
        <h3>Submit your puzzle</h3>
        <FormControl variant='standard' error={categoryHasError}>
          <InputLabel>Category</InputLabel>
          <Select
            className='dropdown'
            label='Category *'
            value={category}
            onChange={event => {
              setCategoryHasError(false);
              setCategory(event.target.value);
            }}
          >
            {categoryOptions}
          </Select>
          {/* {categoryHasError && <FormHelperText>This is required!</FormHelperText>} */}
        </FormControl>
        <FormControl variant='standard' error={missingPiecesHasError}>
          <InputLabel>Missing Pieces</InputLabel>
          <Select
            className='dropdown'
            value={missingPieceCount}
            onChange={event => {
              setMissingPiecesHasError(false);
              setMissingPieceCount(event.target.value);
            }}
            >
            {piecesOptions}
          </Select>
            {/* {missingPiecesHasError && <FormHelperText>This is required!</FormHelperText>} */}
        </FormControl>
        <FormControl variant='standard' error={qualityHasError}>
          <InputLabel>Quality</InputLabel>
          <Select
            className='dropdown'
            value={quality}
            onChange={event => {
              setQualityHasError(false);
              setQuality(event.target.value);
            }}
            >
            {qualityOptions}
          </Select>
            {/* {qualityHasError && <FormHelperText>This is required!</FormHelperText>} */}
        </FormControl>
        {/* <FormControl error={priceHasError}> */}
          
        <TextField
          error={priceHasError}
          className='dropdown'
          label='Original Price Point'
          type='number'
          variant='standard'
          value={price}
          onChange={event => {
            setPriceHasError(false);
            setPrice(event.target.value);
          }}
          />
          {/* </FormControl> */}
          {/* {priceHasError && <FormHelperText>This is required!</FormHelperText>} */}
        <TextField
          error={pieceCountHasError}
          className='dropdown'
          label='Piece Count'
          type='number'
          variant='standard'
          value={pieceCount}
          onChange={event => {
            setPieceCountHasError(false);
            setPieceCount(event.target.value);
          }}
        />
        {/* <FormControl variant='standard'>
          <InputLabel>Upload Image</InputLabel>
          <Select
            className='dropdown'
            value={missingPieceCount}
            onChange={event => setMissingPieceCount(event.target.value)}
          >
            {piecesOptions}
          </Select>
        </FormControl> */}
        <button className='submit-button' onClick={e => handleSubmit(e)}>Submit</button>
      </form>
    </section>
  )
}

export default AddPuzzleForm;