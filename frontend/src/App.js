import AddBookPopup from './components/partials/AddBookPopup';
import Drawer from './components/partials/Drawer';
import Footer from './components/partials/Footer';
import Header from './components/partials/Header';
import Books from './pages/Books';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import './styles.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <Drawer />
        <AddBookPopup />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/books' element={<Books />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
