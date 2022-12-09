import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Categories from "./Categories";
import { UserContext } from "./_context/UserContext";
import { VisualModeContext } from "./_context/VisualModeContext";

const Nav = () => {
  //visual mode
  const { mode } = useContext(VisualModeContext);
  //component

  const { user } = useContext(UserContext);

  return (
    <nav>
      <ul>
        <li>
          <Link tabIndex="-1" to="/">
            <button className={`NavButton ${mode}`}>Home</button>
          </Link>
        </li>
        <li>
          <Categories />
        </li>
      </ul>
      <Link to={`/users/${user.username}`}>
        <section className="Nav--User">
          <img
            className="Nav--User--Img"
            src={user.avatar_url}
            alt={user.username}
            aria-label="User profile"
          ></img>
          <p>{user.username}</p>
        </section>
      </Link>
    </nav>
  );
};

export default Nav;
