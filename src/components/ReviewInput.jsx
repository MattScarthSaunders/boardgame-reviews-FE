import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { postReview } from "./api";
import { CategoryContext } from "./context/CategoryContext";
import { ReviewsContext } from "./context/ReviewsContext";
import { UserContext } from "./context/UserContext";
import { VisualModeContext } from "./context/VisualModeContext";
import DeleteItem from "./DeleteItem";

const ReviewInput = () => {
  //visual mode
  const { mode } = useContext(VisualModeContext);
  //component
  const { categories } = useContext(CategoryContext);
  const { reviews, setReviews } = useContext(ReviewsContext);

  //form
  const { user } = useContext(UserContext);
  const [titleInput, setTitleInput] = useState("");
  const [designerInput, setDesignerInput] = useState("");
  const [categorySelector, setCategorySelector] = useState("strategy");
  const [bodyInput, setBodyInput] = useState("");

  //submit
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [submittedReview, setSubmittedReview] = useState({});

  //ux
  const [error, setError] = useState("");

  const handleInput = (e) => {
    if (e.target.id === "reviewTitleInput") {
      setTitleInput(e.target.value);
    }
    if (e.target.id === "reviewDesignerInput") {
      setDesignerInput(e.target.value);
    }
    if (e.target.id === "reviewCategorySelector") {
      setCategorySelector(e.target.value);
    }
    if (e.target.id === "reviewBody") {
      setBodyInput(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReviewSuccess(false);
    postReview(
      user.username,
      titleInput,
      bodyInput,
      designerInput,
      categorySelector
    )
      .then((response) => {
        setSubmittedReview(response);
        setReviewSuccess(true);
      })
      .catch((err) => {
        if (err) {
          setReviewSuccess(false);
          err.response.status < 500
            ? setError(
                "Post invalid, please check your submission and try again"
              )
            : setError(
                "Sorry, we couldn't post the review right now. Please try again later"
              );
        }
      });
  };

  return (
    <section className={`Reviews--List--AddReview ${mode}`}>
      <h2>Add a new review</h2>
      <form
        className={`Reviews--List--AddReview--Form ${mode}`}
        onSubmit={handleSubmit}
      >
        <label htmlFor="reviewTitleInput">Review Title:</label>
        <input
          id="reviewTitleInput"
          onChange={handleInput}
          value={titleInput}
        ></input>
        <label htmlFor="reviewDesignerInput">Game Designer:</label>
        <input
          id="reviewDesignerInput"
          onChange={handleInput}
          value={designerInput}
        ></input>
        <label htmlFor="reviewCategorySelector">Category</label>
        <select
          id="reviewCategorySelector"
          onChange={handleInput}
          value={categorySelector}
        >
          {categories.map(({ slug }) => {
            return <option key={slug}>{slug}</option>;
          })}
        </select>
        <label htmlFor="reviewBody">Review Content:</label>
        <textarea
          id="reviewBody"
          onChange={handleInput}
          value={bodyInput}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {reviewSuccess ? (
        <>
          <section className={`Reviews--List--Card ${mode}`}>
            <DeleteItem
              review={submittedReview}
              setReviews={setReviews}
              setReviewSuccess={setReviewSuccess}
            />
            <img src={submittedReview.avatar_url} alt={submittedReview.title} />
            <h3>{submittedReview.title}</h3>
            <section className={`Reviews--List--Card--Info ${mode}`}>
              <Link to={`/users/${submittedReview.owner}`}>
                <p className={`Reviews--List--Card--UserLink ${mode}`}>
                  User: {submittedReview.owner}
                </p>
              </Link>
              <p id="VoteCount">
                {submittedReview.votes >= 0
                  ? `+${submittedReview.votes}`
                  : `-${submittedReview.votes}`}
              </p>
              <p>Posted: {submittedReview.created_at.slice(0, 10)}</p>
            </section>
            <Link tabIndex="-1" to={`/reviews/${submittedReview.review_id}`}>
              <button className={`Reviews--List--Card--ReviewLink ${mode}`}>
                See Review
              </button>
            </Link>
          </section>
        </>
      ) : error ? (
        <p>{error}</p>
      ) : null}
    </section>
  );
};

export default ReviewInput;
