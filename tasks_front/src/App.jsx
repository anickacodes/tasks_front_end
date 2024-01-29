
import axios from 'axios';
import '../App.css'
import NavBar from './components/NavBar';

const App = () => {
const url = import.meta.env.VITE_URL
axios
  .get(url)
  .then(res => console.log())
  .catch(err => console.error(err));

  return(
    <>
    <NavBar />
    </>
  )
}

