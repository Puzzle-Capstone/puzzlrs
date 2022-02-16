import React, { useState, MouseEvent, useContext } from 'react';
import { PuzzleContext } from '../Context';
import { Select, InputLabel, FormControl, TextField, Snackbar } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import ErrorPage from './ErrorPage';
import { categoryOptions, piecesOptions, qualityOptions } from '../utils';
import '../css/AddPuzzleForm.css'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddPuzzleForm = () => {
  const { user, refreshData } = useContext(PuzzleContext);

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

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const postPuzzle = async () => {
    try {
      const res = await fetch('https://puzzlrs.herokuapp.com/api/v1/puzzles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: Number(user.id),
          category: category,
          missing_pieces: missingPieceCount,
          piece_count: pieceCount,
          quality: quality,
          availability: true,
          original_price_point: price,
          image: image
        })
      })
      const { data } = await res.json()
      refreshData(user.id)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    checkIfErrors();
    if (category && missingPieceCount && price && quality && pieceCount && image) {
      postPuzzle();
      clearInputs();
      setIsSuccessful(true)
      setMessage('Your puzzle was uploaded!')
      showMessage();
    }
  }

  const checkIfErrors = () => {
    if (!category && !categoryHasError) {
      setCategoryHasError(true)
    }
    if (!missingPieceCount && !missingPiecesHasError) {
      setMissingPiecesHasError(true)
    }
    if (!quality && !qualityHasError) {
      setQualityHasError(true)
    }
    if (!price && !priceHasError) {
      setPriceHasError(true)
    }
    if (!pieceCount && !pieceCountHasError) {
      setPieceCountHasError(true)
    }
    if (!image) {
      setIsSuccessful(false);
      setOpenSuccessMessage(true);
    }
  }

  const clearInputs = () => {
    setCategory('');
    setMissingPieceCount('');
    setQuality('');
    setPrice('');
    setPieceCount('');
    setImage('');
  }

  const showMessage = () => {
    setOpenSuccessMessage(true);
  };

  const closeMessage = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessMessage(false);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'puzzlrs');
    const res = await fetch('https://api.cloudinary.com/v1_1/dqgqw1dld/image/upload', {
      method: 'POST',
      body: data
    })
    const file = await res.json()
    setImage(file.secure_url)
    setIsSuccessful(true)
    setMessage('Your photo was uploaded!')
    showMessage();
  }

  const renderForm = user.username ?
    <section className='form-container'>
      <form>
        <h3 className='form-title'>Submit your puzzle</h3>
        <FormControl variant='standard' error={categoryHasError}>
          <InputLabel>Category</InputLabel>
          <Select
            className='dropdown'
            id='category'
            label='Category *'
            value={category}
            onChange={event => {
              setCategoryHasError(false);
              setCategory(event.target.value);
            }}
          >
            {categoryOptions}
          </Select>
        </FormControl>
        <FormControl variant='standard' error={missingPiecesHasError}>
          <InputLabel>Missing Pieces</InputLabel>
          <Select
            id='missingPieces'
            className='dropdown'
            value={missingPieceCount}
            onChange={event => {
              setMissingPiecesHasError(false);
              setMissingPieceCount(event.target.value);
            }}
          >
            {piecesOptions}
          </Select>
        </FormControl>
        <FormControl variant='standard' error={qualityHasError}>
          <InputLabel>Quality</InputLabel>
          <Select
            id='quality'
            className='dropdown'
            value={quality}
            onChange={event => {
              setQualityHasError(false);
              setQuality(event.target.value);
            }}
          >
            {qualityOptions}
          </Select>
        </FormControl>
        <TextField
          error={priceHasError}
          className='dropdown'
          label='Original Price Point'
          id='price'
          type='number'
          variant='standard'
          value={price}
          onChange={event => {
            setPriceHasError(false);
            setPrice(event.target.value);
          }}
        />
        <TextField
          error={pieceCountHasError}
          className='dropdown'
          label='Piece Count'
          id='pieceCount'
          type='number'
          variant='standard'
          value={pieceCount}
          onChange={event => {
            setPieceCountHasError(false);
            setPieceCount(event.target.value);
          }}
        />
        <label className='upload-photo-button' id='uploadPhotoButton'>
          upload photo
          <input accept="image/*" id="upload-photo" type="file" onChange={e => handleImage(e)} />
          <AddAPhotoIcon />
        </label>
        <button className='submit-button' onClick={e => handleSubmit(e)}>Submit</button>
      </form>
      <Snackbar open={openSuccessMessage} autoHideDuration={4000} onClose={closeMessage}>
        {isSuccessful ? <Alert onClose={closeMessage} id='successAlert' severity='success' sx={{ width: '100%' }}>{message}</Alert> :
          <Alert onClose={closeMessage} id='errorAlert' severity='error' sx={{ width: '100%' }}>Please upload a photo!</Alert>}
      </Snackbar>
    </section> :
    <div className='flex'>
      <ErrorPage message='You are not logged in! Click above or return home.' />
    </div>

  return (
    <>
      {renderForm}
    </>
  )
}

export default AddPuzzleForm;