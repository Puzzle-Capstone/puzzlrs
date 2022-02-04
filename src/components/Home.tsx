import React from "react";
import { Link } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  return (
    <section className="homepage">
      <h2>Tired of your puzzles? Trade with people like you!</h2>
      <Link to='/puzzles'><button>View Puzzles</button></Link>
    </section>
  )
}

export default Home;