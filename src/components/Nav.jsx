import { Link } from "react-router-dom";
import Categories from "./Categories";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <button className="NavButton">
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
