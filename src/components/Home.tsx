import { Link } from 'react-router-dom';
import '../css/Home.css';
import { GiPuzzle } from "react-icons/gi";

const Home = () => {
  return (
    <section className="homepage">
      <GiPuzzle className='puzzle-icon' size={425}/>
      <h2>Tired of your puzzles? Trade with people like you!</h2>
      <Link to='/puzzles'><button>View Available Puzzles</button></Link>
    </section>
  )
}

export default Home;