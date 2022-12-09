import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { VisualModeContext } from "./components/_context/VisualModeContext";
import Header from "./components/Header";
import Review from "./components/reviews/Review";
import ReviewInput from "./components/reviews/ReviewInput";
import ReviewsList from "./components/reviews/ReviewsList";
import UserProfile from "./components/users/UserProfile";

function App() {
  //visual mode
  const { mode } = useContext(VisualModeContext);

  return (
    <div className={`App ${mode}`}>
      <Header />
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
