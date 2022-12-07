import { useContext, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { VisualModeContext } from "./components/context/VisualModeContext";
import Nav from "./components/Nav";
import Review from "./components/Review";
import ReviewsList from "./components/ReviewsList";

function App() {
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
    <div className={`App ${mode}`}>
      <header>
        <h1>Boardgame Reviews</h1>
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
      <main className={`${mode}`}>
        <Routes>
          <Route path="/" element={<ReviewsList />} />
          <Route path="/:category" element={<ReviewsList />} />
        </Routes>
        <Routes>
          <Route path="/reviews/:review_id" element={<Review />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
