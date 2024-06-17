import { Link } from "react-router-dom";

const Navbar = () => {
  return ( 
    <nav className="navbar">
      <Link to="/">Technique Reroll</Link>
      <Link to="/stats">Stat Reroll</Link>
    </nav>
  );
}
 
export default Navbar;