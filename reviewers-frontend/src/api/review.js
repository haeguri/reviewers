import { fetchData } from '../utils/http';

const getBaseReviewApiUrl = (qId, rId) => {
  const baseUrl = `/api/questions/${qId}/reviews`;

  if (!rid) {
    return baseUrl;
  } else {
    return `${baseUrl}/${rId}`;
  }
};

const api = {
  getReviews: async (questionId) => {
    const url = getBaseReviewApiUrl(questionId);
    const json = await fetchData(url, 'GET');
    return Promise.resolve(json);
  },
  newReview: async (data, questionId) => {
    const url = getBaseReviewApiUrl(questionId);
    const json = await fetchData(url, 'POST', data);
    return Promise.resolve(json);
  },
  updateReview: async (data, questionId, reviewId) => {
    const url = getBaseReviewApiUrl(questionId, reviewId);
    try {
      const json = await fetchData(url, 'PUT', data)
      return Promise.resolve(json);
    } catch (err) { }
  },
  deleteReview: async (questionId, reviewId) => {
    const url = getBaseReviewApiUrl(questionId, reviewId);
    try { 
      await fetchData(url, 'DELETE');
      return this.getReviews();
    } catch (err) {}
  }
};

export default api;