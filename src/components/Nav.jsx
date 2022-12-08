import { useContext } from "react";
import { Link } from "react-router-dom";
import Categories from "./Categories";
import { VisualModeContext } from "./context/VisualModeContext";

const Nav = () => {
  //visual mode
  const { mode } = useContext(VisualModeContext);
  //component

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
    </nav>
  );
};

export default Nav;
