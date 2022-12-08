import axios from "axios";

const reviewsAPI = axios.create({
  baseURL: "https://boardgame-reviews.cyclic.app/api",
});

export const getReviews = (
  page = 0,
  limit = 10,
  category,
  { sort_by, order }
) => {
  let chosenCategory = category;
  if (category === "All") chosenCategory = null;

  let sort = sort_by;
  if (!sort_by) sort = null;

  return reviewsAPI
    .get("/reviews", {
      params: {
        p: page,
        limit,
        category: chosenCategory,
        sort_by: sort,
        order,
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const getReview = (review_id) => {
  return reviewsAPI.get(`/reviews/${review_id}`).then((response) => {
    return response.data.review;
  });
};

export const getCommentsByReview = (review_id) => {
  return reviewsAPI.get(`/reviews/${review_id}/comments`).then((response) => {
    return response.data.comments;
  });
};

export const getCategories = () => {
  return reviewsAPI.get(`/categories`).then((response) => {
    return response.data.categories;
  });
};

export const getUserByUsername = (username) => {
  return reviewsAPI.get(`/users/${username}`).then((response) => {
    return response.data.user;
  });
};

export const patchReviewVotesUp = (review_id, value) => {
  return reviewsAPI.patch(`/reviews/${review_id}`, { inc_votes: value });
};

export const patchReviewVotesDown = (review_id, value) => {
  return reviewsAPI.patch(`/reviews/${review_id}`, { inc_votes: -value });
};

export const patchCommentVotesUp = (comment_id, value) => {
  return reviewsAPI.patch(`/comments/${comment_id}`, { inc_votes: value });
};

export const patchCommentVotesDown = (comment_id, value) => {
  return reviewsAPI.patch(`/comments/${comment_id}`, { inc_votes: -value });
};

export const postComment = (comment, review_id, currentUser) => {
  return reviewsAPI
    .post(`/reviews/${review_id}/comments`, {
      username: currentUser,
      body: comment,
    })
    .then((response) => {
      return response.data.comment;
    });
};

export const postReview = (owner, title, review_body, designer, category) => {
  return reviewsAPI
    .post(`/reviews`, {
      owner,
      title,
      review_body,
      designer,
      category,
    })
    .then((response) => {
      return response.data.review;
    });
};

export const deleteComment = (comment_id) => {
  return reviewsAPI.delete(`/comments/${comment_id}`);
};

export const deleteReview = (review_id) => {
  return reviewsAPI.delete(`/reviews/${review_id}`);
};
