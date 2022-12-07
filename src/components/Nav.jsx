import { Link } from "react-router-dom";
import Categories from "./Categories";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <button tabIndex="-1" className="NavButton">
            <Link to="/">Home</Link>
          </button>
        </li>
        <li>
          <Categories />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
