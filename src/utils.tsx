import { MenuItem } from "@mui/material";

const categories = ['Art', 'Animals', 'Food', 'Holidays', 'Miscellaneous', 'Mythical', 'Nature', 'People', 'Structures', 'Travel'];
const missingPieces = ['1', '2', '3', '4', '5+'];
const conditions = ['Poor', 'Fair', 'Good', 'Excellent']
const pieceCount = ['0-99', '100-499', '500-999', '1000-1499', '1500+']
const userIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

export const categoryOptions = categories.map(category => {
  return (
    <MenuItem value={category} key={category}>{category}</MenuItem>
  )
})

export const userIdOptions = userIds.map(id => {
  return (
    <MenuItem value={id} key={id}>{id}</MenuItem>
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