import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='nav'>
      <Link to='/' className='site-title'>The Book Keeper</Link>
      <ul>
        <li><Link to='/login'>Log In</Link></li>
        <li><Link to='/signup'>Sign Up</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;