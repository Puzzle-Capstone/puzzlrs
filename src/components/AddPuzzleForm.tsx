import React from "react";
import { Select, InputLabel, FormControl, MenuItem } from "@mui/material";
import '../css/AddPuzzleForm.css'

const AddPuzzleForm = () => {

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