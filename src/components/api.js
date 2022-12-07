import axios from "axios";

const reviewsAPI = axios.create({
  baseURL: "https://boardgame-reviews.cyclic.app/api",
});

export const getReviews = (page = 0, limit = 10, category) => {
  let chosenCategory = category;
  if (category === "All") {
    chosenCategory = null;
  }
  return reviewsAPI
    .get("/reviews", { params: { p: page, limit, category: chosenCategory } })
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

export const postComment = (comment, review_id) => {
  return reviewsAPI
    .post(`/reviews/${review_id}/comments`, {
      username: "jessjelly",
      body: comment,
    })
    .then((response) => {
      return response.data.comment;
    });
};
