import { Link } from 'react-router-dom';
import "./nav.css";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      <h2 >
        <Link to="/" className= "h2">Home</Link>
        <Link to="/SavedCandidates" className= "h2">   Potential Candidates</Link>
      </h2>



    </div>
    
  )
};

export default Nav;
