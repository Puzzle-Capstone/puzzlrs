import { MenuItem } from "@mui/material";

const categories = ['Animals', 'Art', 'Mystery', 'Mythical', 'Nature', 'Funny', 'Travel'];
const missingPieces = ['0-10', '10-20', '20-30', '30-40', '40-50'];
const conditions = ['Fair', 'Good', 'Very Good', 'Excellent']

export const categoryOptions = categories.map(category => {
  return (
    <MenuItem value={category} key={category}>{category}</MenuItem>
  )
})

export const piecesOptions = missingPieces.map(missingPiece => {
  return (
    <MenuItem value={missingPiece} key={missingPiece}>{missingPiece}</MenuItem>
  )
})

export const qualityOptions = conditions.map(quality => {
  return (
    <MenuItem value={quality} key={quality}>{quality}</MenuItem>
  )
})