import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { postReview } from "../api";
import { CategoryContext } from "../_context/CategoryContext";
import { ReviewsContext } from "../_context/ReviewsContext";
import { UserContext } from "../_context/UserContext";
import { VisualModeContext } from "../_context/VisualModeContext";
import DeleteItem from "./DeleteReview";

const ReviewInput = () => {
  //visual mode
  const { mode } = useContext(VisualModeContext);
  //component
  const { categories } = useContext(CategoryContext);
  const { setReviews } = useContext(ReviewsContext);
  const [submittedReview, setSubmittedReview] = useState({});

  //form
  const { user } = useContext(UserContext);
  const [titleInput, setTitleInput] = useState("");
  const [designerInput, setDesignerInput] = useState("");
  const [categorySelector, setCategorySelector] = useState("strategy");
  const [bodyInput, setBodyInput] = useState("");

  //ux
  const [error, setError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleting, setDeleting] = useState("");

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

  const inputChecker = () => {
    if (!titleInput.length) {
      setErrorMessage("Input a title!");
      return false;
    } else if (!designerInput.length) {
      setErrorMessage("Input a designer!");
      return false;
    } else if (!bodyInput.length) {
      setErrorMessage("Your review cannot be blank!");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReviewSuccess(false);
    setIsLoading(false);
    if (inputChecker()) {
      setErrorMessage("");
      setIsLoading(true);
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
          setIsLoading(false);
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
            setIsLoading(false);
          }
        });
    }
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
          placeholder="Give it a title"
        ></input>
        <label htmlFor="reviewDesignerInput">Game Designer:</label>
        <input
          id="reviewDesignerInput"
          onChange={handleInput}
          value={designerInput}
          placeholder="Name the designer"
        ></input>
        <label htmlFor="reviewCategorySelector">Category:</label>
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
          placeholder="What do you have to say...?"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {errorMessage.length > 0 ? (
        <p>{errorMessage}</p>
      ) : isLoading ? (
        <>
          <div className={`loader ${mode}`}></div>
          <p>loading...</p>
        </>
      ) : reviewSuccess ? (
        <>
          <section className={`Reviews--List--Card ${deleting} ${mode}`}>
            <DeleteItem
              review={submittedReview}
              setReviews={setReviews}
              setReviewSuccess={setReviewSuccess}
              setDeleting={setDeleting}
            />
            <h3>{submittedReview.title}</h3>
            <section className={`Reviews--List--Card--Info ${mode}`}>
              <Link to={`/users/${submittedReview.owner}`}>
                <p className={`Reviews--List--Card--UserLink ${mode}`}>
                  User: {submittedReview.owner}
                </p>
              </Link>
              <p>Category: {submittedReview.category}</p>
              <p id="reviewPreview">
                Content preview: {submittedReview.review_body}
              </p>
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
