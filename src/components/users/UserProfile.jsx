import { useContext } from "react";
import { useParams } from "react-router-dom";
import { VisualModeContext } from "../_context/VisualModeContext";
import { useUsername } from "../_hooks/useUsername";
import UserReview from "./UserReview";

const UserProfile = () => {
  //visual mode
  const { mode } = useContext(VisualModeContext);

  //component
  const { username } = useParams();

  //ux

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
              {userReviews.map((review) => {
                return (
                  <UserReview
                    key={review.review_id}
                    review={review}
                    setUserReviews={setUserReviews}
                  />
                );
              })}
            </ul>
          </>
        )}
      </section>
    </section>
  );
};

export default UserProfile;
