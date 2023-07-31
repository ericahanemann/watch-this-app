import { Link } from "react-router-dom";
import logo from "../assets/watchthis-logo.png";

function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 flex justify-between items-center h-20 px-6 pb-2 bg-gradient-to-b from-primary from-70%  to-transparent z-50">
      <Link to="/">
        <img className="h-12" src={logo} />
      </Link>

      <div className="flex gap-8 items-center">
        <Link to="/" className="hover:text-highlights">Home</Link>
        <Link to="my-lists"className="hover:text-highlights">My Lists</Link>
      </div>
    </nav>
  );
}

export default Navbar;
