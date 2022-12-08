import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { VisualModeContext } from "./context/VisualModeContext";
import Nav from "./Nav";

const Header = () => {
  //visual mode
  const { mode, setMode } = useContext(VisualModeContext);

  //component
  const headers = useMemo(() => {
    return (
      <>
        <Nav />
      </>
    );
  }, []);

  return (
    <header>
      <Link to="/">
        <h1>Boardgame Reviews</h1>
      </Link>
      {headers}
      <div className="VisualMode--Container">
        <button
          className={`VisualMode--Switch ${mode}`}
          onClick={(e) => {
            e.target.value === "light" ? setMode("dark") : setMode("light");
          }}
          value={mode}
        >
          {mode}
        </button>
        <div className="styleSlider"></div>
      </div>
    </header>
  );
};

export default Header;
