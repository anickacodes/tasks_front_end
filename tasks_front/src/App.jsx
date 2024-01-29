
import axios from 'axios';
import './App.css'
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';

const App = () => {
const url = import.meta.env.VITE_URL
axios
  .get(`${url}/users`)
  .then(res => console.log())
  .catch(err => console.error(err));

  return(
    <div>
    <NavBar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
    </Routes>
</div>
  )
}

export default App