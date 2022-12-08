import { useEffect, useState } from "react";
import { getReviews, getUserByUsername } from "../api";

export const useUsername = (username) => {
  // const { setReviews } = useContext(ReviewsContext);
  // const { username } = useParams();
  const [user, setUser] = useState({});
  const [userReviews, setUserReviews] = useState([]);
  //ux
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [error, setError] = useState("");
  // const [deleting, setDeleting] = useState("");

  useEffect(() => {
    setError("");
    setLoading(true);
    getUserByUsername(username)
      .then((response) => {
        setReviewsLoading(true);
        setUser(response);
        setLoading(false);
      })
      .catch((err) => {
        if (err) {
          err.response.status < 500
            ? setError("User does not exist")
            : setError("Could not retrieve user");
        }
        setLoading(false);
      });
  }, [username]);

  useEffect(() => {
    if (user.username) {
      setError("");
      setReviewsLoading(true);
      getReviews(0, 50, "All", {
        sort_by: "created_at",
        order: "desc",
      })
        .then((response) => {
          setUserReviews(() => {
            return response.reviews.filter(
              (review) => review.owner === user.username
            );
          });
          setReviewsLoading(false);
        })
        .catch((err) => {
          if (err) {
            err.response.status < 500
              ? setError("User has no reviews!")
              : setError("Could not retrieve user's reviews");
          }
          setReviewsLoading(false);
        });
    }
  }, [user]);

  return { userReviews, setUserReviews, loading, reviewsLoading, error, user };
};
