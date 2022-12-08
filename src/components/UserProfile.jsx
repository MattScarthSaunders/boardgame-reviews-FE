import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ReviewsContext } from "./context/ReviewsContext";
import { VisualModeContext } from "./context/VisualModeContext";
import DeleteItem from "./DeleteItem";
import { useUsername } from "./hooks/useUsername";

const UserProfile = () => {
  //visual mode
  const { mode } = useContext(VisualModeContext);

  //component
  const { setReviews } = useContext(ReviewsContext);
  const { username } = useParams();

  //ux
  const [deleting, setDeleting] = useState("");
  const { userReviews, setUserReviews, loading, reviewsLoading, error, user } =
    useUsername(username);

  return loading ? (
    <>
      <div className={`loader ${mode}`}></div>
      <p>loading...</p>
    </>
  ) : error ? (
    <h3>{error}</h3>
  ) : (
    <section className={`UserProfile ${mode}`}>
      <section className={`UserProfile--About ${mode}`}>
        <h2 className={`UserProfile--Username ${mode}`}>{user.username}</h2>
        <img
          className={`UserProfile--Avatar ${mode}`}
          src={user.avatar_url}
          alt={user.username}
        />
      </section>
      <h2
        className={`UserReviews--Heading ${mode}`}
      >{`${user.username}'s Reviews:`}</h2>
      <section className={`UserProfile--UserReviews ${mode}`}>
        {!userReviews.length ? (
          <p>{user.username} has no reviews yet!</p>
        ) : reviewsLoading ? (
          <>
            <div className={`loader ${mode}`}></div>
            <p>loading...</p>
          </>
        ) : (
          <>
            <ul className={`UserReviews--List ${mode}`}>
              {userReviews.map(
                ({
                  review_id,
                  title,
                  owner,
                  review_img_url,
                  created_at,
                  votes,
                }) => {
                  return (
                    <li
                      key={review_id}
                      className={`UserReviews--List--Card ${deleting} ${mode}`}
                    >
                      <DeleteItem
                        review={{ review_id, owner }}
                        setReviews={setReviews}
                        setDeleting={setDeleting}
                        setUserReviews={setUserReviews}
                      />
                      <img src={review_img_url} alt={title} />
                      <h3>{title}</h3>
                      <section
                        className={`UserReviews--List--Card--Info ${mode}`}
                      >
                        <p>User: {owner}</p>
                        <p id="VoteCount">
                          {votes >= 0 ? `+${votes}` : `-${votes}`}
                        </p>
                        <p>Posted: {created_at.slice(0, 10)}</p>
                      </section>
                      <Link tabIndex="-1" to={`/reviews/${review_id}`}>
                        <button>See Review</button>
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
          </>
        )}
      </section>
    </section>
  );
};

export default UserProfile;
