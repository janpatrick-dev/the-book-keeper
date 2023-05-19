import { Link } from "react-router-dom";


const Home = () => {

  return (
    <div className="home">
      <h1 className="home__title">Welcome to The Book Keeper!</h1>
      <p className="home__description">
        Organize and track your reading progress with our book collection app. 
        Create a personalized library, add new books, and update your reading status. 
        Perfect for casual readers or dedicated bibliophiles. Try it now!
      </p>
      <div className="home__link-container">
        <Link to='/login' className="link home__login-link">Log in</Link>
        <Link to='/signup' className="link home__signup-link">Sign up</Link>
      </div>
    </div>
  )
}

export default Home;