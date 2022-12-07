import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Review from "./components/Review";
import ReviewsList from "./components/ReviewsList";

function App() {
  const headers = useMemo(() => {
    return (
      <header>
        <Header />
        <Nav />
      </header>
    );
  }, []);

  return (
    <div className="App">
      {headers}
      <main>
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
