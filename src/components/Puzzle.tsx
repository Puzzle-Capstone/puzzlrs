import '../css/Puzzle.css';
// import PuzzleDetails from '../components/PuzzleDetails'

interface puzzleProps {
    id: string
    pieceCount: string
    image: string
  }
  
  const Puzzle: React.FC<puzzleProps> = ({ id, pieceCount, image }) => {

  return (
    <section>
      <div className='individual-puzzle' onClick={() => console.log(id)}>
        <img src={image}/>
      </div>
      <h4 className='piece-count'>{pieceCount} pieces</h4>
    </section>
  )
}

export default Puzzle;