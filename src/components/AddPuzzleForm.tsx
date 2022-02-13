import React, { useState, MouseEvent, useContext } from 'react';
import { Select, InputLabel, FormControl, TextField, FormHelperText, Stack, Snackbar, styled, Button} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { categoryOptions, piecesOptions, qualityOptions } from '../utils';
import { PuzzleContext } from '../Context';
import '../css/AddPuzzleForm.css'


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Input = styled('input')({
  display: 'none',
});

const AddPuzzleForm = () => {
  const { userID, addPuzzle } = useContext(PuzzleContext);

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

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    checkIfErrors();
    if(category  && missingPieceCount  && price  && quality  && pieceCount && image) {
      postPuzzle();
      clearInputs();
      setIsSuccessful(true)
      setMessage('Your puzzle was uploaded!')
      showMessage();
    } 
  }

  const postPuzzle = async () => {
    const res = await fetch('https://puzzlrs.herokuapp.com/api/v1/puzzles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: Number(userID),
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
    addPuzzle(data);
  }

  const checkIfErrors = () => {
      if(!category && !categoryHasError) {
        setCategoryHasError(true)
      }
      if(!missingPieceCount && !missingPiecesHasError) {
        setMissingPiecesHasError(true)
      }
      if(!quality && !qualityHasError) {
        setQualityHasError(true)
      }
      if(!price && !priceHasError) {
        setPriceHasError(true)
      }
      if(!pieceCount && !pieceCountHasError) {
        setPieceCountHasError(true)
      }
      if(!image) {
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

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pic = e.target.files![0]
    const fullPic = URL.createObjectURL(pic)
    setImage(fullPic)
    console.log(fullPic)
  }

  return (
    <section className='form-container'>
      <form>
        <h3 className='form-title'>Submit your puzzle</h3>
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
          {categoryHasError && <FormHelperText>This is required!</FormHelperText>}
        </FormControl>
        <FormControl variant='standard' error={missingPiecesHasError}>
          <InputLabel>Missing Pieces</InputLabel>
          <Select
            // sx={{width: '100%'}}
            className='dropdown'
            value={missingPieceCount}
            onChange={event => {
              setMissingPiecesHasError(false);
              setMissingPieceCount(event.target.value);
            }}
            >
            {piecesOptions}
          </Select>
            {missingPiecesHasError && <FormHelperText>This is required!</FormHelperText>}
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
            {qualityHasError && <FormHelperText>This is required!</FormHelperText>}
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
        <label htmlFor='upload-photo'>
          <Input accept="image/*" id="upload-photo" type="file" onChange={e => handleImage(e)}/>
          <Button
            sx={{color: 'white', backgroundColor: '#5D736B', '&:hover': {backgroundColor: '#474E4A'}}}
            className='add-photo'
            component='span'
            aria-label='add-photo'
            variant='contained'
            size='large'
            color='inherit'
            startIcon={<AddAPhotoIcon />}
            >
            Upload photo
          </Button>
          {/* <button >{<div><AddAPhotoIcon /> <Input accept="image/*" id="upload-photo" multiple type="file" /></div>} Upload Photo</button> */}
        </label>
          {/* <div>
            {image && <p>{image}</p>}
          </div> */}
        <button className='submit-button' onClick={e => handleSubmit(e)}>Submit</button>
      </form>
      <Snackbar open={openSuccessMessage} autoHideDuration={4000} onClose={closeMessage}>
        { isSuccessful ? <Alert onClose={closeMessage} severity='success' sx={{ width: '100%' }}>Your puzzle was uploaded!</Alert> :
        <Alert onClose={closeMessage} severity='error' sx={{ width: '100%' }}>Please upload a photo!</Alert>}
      </Snackbar>
    </section>
  )
}

export default AddPuzzleForm;