import axios from "axios";

const reviewsAPI = axios.create({
  baseURL: "https://boardgame-reviews.cyclic.app/api",
});

export const getReviews = () => {
  return reviewsAPI.get("/reviews").then((response) => {
    return response.data.reviews;
  });
};
