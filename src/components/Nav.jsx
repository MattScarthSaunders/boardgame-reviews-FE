import { Link } from "react-router-dom";
import Categories from "./Categories";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <button tabindex="-1" className="NavButton">
            <Link to="/">Reviews</Link>
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
