import Navbar from './components/partials/Navbar';
import Books from './pages/Books';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './styles.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/books' element={<Books />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
