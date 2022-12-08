import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { VisualModeContext } from "../context/VisualModeContext";
import DeleteItem from "./DeleteReview";
import { useReviews } from "../hooks/useReviews";
import ReviewFilter from "./ReviewFilter";

const ReviewsList = () => {
  //visual mode
  const { mode } = useContext(VisualModeContext);
  //component

  const [deleting, setDeleting] = useState("");

  //filtering
  let { category } = useParams();
  const [sortValues, setSortValues] = useState({
    sort_by: "created_at",
    order: "desc",
  });
  const [resultLimit, setResultLimit] = useState(10);
  const [page, setPage] = useState(0);

  const { reviews, reviewCount, pages, isLoading, error } = useReviews(
    resultLimit,
    page,
    category,
    sortValues
  );

  return isLoading ? (
    <>
      <div className={`loader ${mode}`}></div>
      <p>loading...</p>
    </>
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    <>
      <section className={`Reviews--Filtering ${mode}`}>
        <ReviewFilter setSortValues={setSortValues} sortValues={sortValues} />
        <section className="Reviews--Paginator">
          <label htmlFor="resultLimit">Result Limit:</label>
          <select
            id="resultLimit"
            onChange={(e) => {
              setResultLimit(e.target.value);
            }}
            value={resultLimit}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          {reviewCount > resultLimit ? (
            <label htmlFor="PageSelect0">Page:</label>
          ) : null}
          {pages.length > 1
            ? pages.map((page, index) => {
                return (
                  <button
                    id={`PageSelect${index}`}
                    key={index + Math.random()}
                    onClick={() => {
                      setPage(index);
                    }}
                  >
                    {index}
                  </button>
                );
              })
            : null}
        </section>
      </section>
      <Link tabIndex="-1" to="/reviews/add-review">
        <button className={`Reviews--List--AddReviewButton ${mode}`}>
          Share your review!
        </button>
      </Link>
      <ul className={`Reviews--List ${mode}`}>
        {reviews.map(
          ({ review_id, title, owner, review_img_url, created_at, votes }) => {
            return (
              <li
                key={review_id}
                className={`Reviews--List--Card ${deleting} ${mode}`}
              >
                <DeleteItem
                  review={{ review_id, owner }}
                  setDeleting={setDeleting}
                />

                <img src={review_img_url} alt={title} />
                <h3>{title}</h3>
                <section className={`Reviews--List--Card--Info ${mode}`}>
                  <Link to={`/users/${owner}`}>
                    <p className={`Reviews--List--Card--UserLink ${mode}`}>
                      User: {owner}
                    </p>
                  </Link>
                  <p id="VoteCount">{votes >= 0 ? `+${votes}` : `-${votes}`}</p>
                  <p>Posted: {created_at.slice(0, 10)}</p>
                </section>
                <Link tabIndex="-1" to={`/reviews/${review_id}`}>
                  <button className={`Reviews--List--Card--ReviewLink ${mode}`}>
                    See Review
                  </button>
                </Link>
              </li>
            );
          }
        )}
      </ul>
    </>
  );
};

export default ReviewsList;
