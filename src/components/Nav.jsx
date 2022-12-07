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
          <button tabIndex="-1" className={`NavButton ${mode}`}>
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
