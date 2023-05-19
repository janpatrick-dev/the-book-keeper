import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  }

  return (
    <nav className='nav'>
      <Link to='/' className='nav__site-title'>The Book Keeper</Link>
      <ul className='nav__list'>
        { user && (
          <div>
            <p>Hi, { user.name }!</p>
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
        { !user && (
          <div>
            <Link to='/login'><li className='nav__item nav__item-login'>Log in</li></Link>
            <Link to='/signup'><li className='nav__item nav__item-signup'>Sign up</li></Link>
          </div>
        )}
      </ul>
    </nav>
  )
}

export default Navbar;