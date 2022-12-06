import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Reviews</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
