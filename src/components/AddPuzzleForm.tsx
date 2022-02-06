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
        <button className="submit-button">Submit</button>
      </form>
    </section>
  )
}

export default AddPuzzleForm;