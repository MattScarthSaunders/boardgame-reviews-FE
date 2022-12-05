import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Review from "./components/Review";
import ReviewsList from "./components/ReviewsList";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ReviewsList />} />
          <Route path="/reviews/:review_id" element={<Review />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
