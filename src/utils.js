import { MenuItem } from "@mui/material";

const categories = ['Animals', 'Art', 'Mystery', 'Mythical', 'Nature', 'Funny', 'Travel'];
const missingPieces = ['0-10', '10-20', '20-30', '30-40', '40-50'];
const conditions = ['Fair', 'Good', 'Very Good', 'Excellent']
const pieceCount = ['0-99', '100-499', '500-999', '1000-1499', '1500+']

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

export const pieceCountOptions = pieceCount.map(pieceCount => {
  return (
    <MenuItem value={pieceCount} key={pieceCount}>{pieceCount}</MenuItem>
  )
})