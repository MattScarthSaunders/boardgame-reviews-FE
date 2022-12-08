import { useContext, useMemo } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { VisualModeContext } from "./components/context/VisualModeContext";
import Nav from "./components/Nav";
import Review from "./components/reviews/Review";
import ReviewInput from "./components/reviews/ReviewInput";
import ReviewsList from "./components/reviews/ReviewsList";
import UserProfile from "./components/UserProfile";

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
      <main className={`${mode}`}>
        <Routes>
          <Route name="home" path="/" element={<ReviewsList />} />
          <Route path="/:category" element={<ReviewsList />} />
          <Route path="/reviews/add-review" element={<ReviewInput />} />
          <Route path="/reviews/:review_id" element={<Review />} />
          <Route path="/users/:username" element={<UserProfile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
