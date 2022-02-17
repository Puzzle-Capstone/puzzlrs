import { Link } from 'react-router-dom';
import { IErrorPage } from '../interfaces';
import { GiPuzzle } from "react-icons/gi";

const ErrorPage = ({ message }: IErrorPage) => {
  return(
    <section className='homepage'>
      <GiPuzzle className='puzzle-icon' size={425}/>
      <h2>{message}</h2>
      <Link to='/'><button>Go Home!</button></Link>
    </section>
  )
}

export default ErrorPage;