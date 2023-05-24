import { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import StringUtils from "../utils/StringUtils";
import { AuthContext } from "../contexts/AuthContext";


const Home = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    StringUtils.setPageTitle('Home');
  }, [])

  return user ? (
    <Navigate to="/books" />
  ) : (
    <div className="home">
      <h1 className="home__title">Welcome to The Book Keeper!</h1>
      <p className="home__description">
        Organize and track your reading progress with our book collection app. 
        Create a personalized library, add new books, and update your reading status. 
        Perfect for casual readers or dedicated bibliophiles. Try it now!
      </p>
      <div className="home__link-container">
        <Link to='/login' className="link btn-login">Log in</Link>
        <Link to='/signup' className="link btn-signup">Sign up</Link>
      </div>
    </div>
  );
}

export default Home;