import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getReviews } from "./api";
import { VisualModeContext } from "./context/VisualModeContext";
import ReviewFilter from "./ReviewFilter";

const ReviewsList = () => {
  //visual mode
  const { mode } = useContext(VisualModeContext);
  //component

  const [reviews, setReviews] = useState([]);

  //filtering
  const { category } = useParams();
  const [sortValues, setSortValues] = useState({
    sort_by: "created_at",
    order: "desc",
  });
  const [reviewCount, setReviewCount] = useState(0);
  const [resultLimit, setResultLimit] = useState(10);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(0);

  //ux
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  //functions
  useEffect(() => {
    setIsLoading(true);
    getReviews(page, resultLimit, category, sortValues)
      .then((response) => {
        setReviews(response.reviews);
        setReviewCount(response.total_count);
        let newPages;
        if (response.reviews.length >= 10) {
          newPages = new Array(Math.ceil(response.total_count / resultLimit));
        } else {
          newPages = new Array(
            Math.ceil(response.reviews.length / resultLimit)
          );
        }
        setPages(newPages.fill());
        setIsLoading(false);
      })
      .catch((err) => {
        if (err) {
          if (err) {
            setIsLoading(false);
            setError("This review does not exist!");
          }
        }
      });
  }, [resultLimit, page, category, sortValues]);

  return isLoading ? (
    <>
      <div className={`loader ${mode}`}></div>
      <p>loading...</p>
    </>
  ) : error ? (
    <h2>These reviews do not exist!</h2>
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
      <ul className={`Reviews--List ${mode}`}>
        {reviews.map(
          ({
            review_id,
            title,
            owner,
            review_img_url,
            created_at,
            votes,
            comment_count,
          }) => {
            return (
              <li key={review_id} className={`Reviews--List--Card ${mode}`}>
                <img src={review_img_url} alt={title} />
                <h3>{title}</h3>
                <section className={`Reviews--List--Card--Info ${mode}`}>
                  <p>User: {owner}</p>
                  <p id="VoteCount">{votes >= 0 ? `+${votes}` : `-${votes}`}</p>
                  <p>Posted: {created_at.slice(0, 10)}</p>
                </section>
                <Link to={`/reviews/${review_id}`}>
                  <button>See Review</button>
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
