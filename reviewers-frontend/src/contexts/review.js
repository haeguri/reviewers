import React, { createContext } from 'react';
import { fetchData } from '../utils/http';

const {
    Consumer: ReviewConsumer,
    Provider
} = createContext();

const getBaseReviewApiUrl = (qId, rId) => {
  const baseUrl = `/api/questions/${qId}/reviews`;

  if (!rId) {
    return baseUrl;
  } else {
    return `${baseUrl}/${rId}`;
  }
};

class ReviewProvider extends React.Component {
    state = {
        data: []
    }

    actions = {
      getReviews: async (questionId) => {
        const url = getBaseReviewApiUrl(questionId);
        try {
          const json = await fetchData(url, 'GET');
          this.setState({data: json.data});
          return Promise.resolve(json);
        } catch (err) {
          return Promise.reject(err);
        }
      },
      newReview: async (data, questionId) => {
        const url = getBaseReviewApiUrl(questionId);
        try {
          await fetchData(url, 'POST', data);
          return this.actions.getReviews(questionId);
        } catch (err) {
          return Promise.reject(err);
        }
      },
      updateReview: async (data, questionId, reviewId) => {
        const url = getBaseReviewApiUrl(questionId, reviewId);
        try {
          await fetchData(url, 'PUT', data)
          return this.actions.getReviews(questionId);
        } catch (err) {
          return Promise.reject(err);
        }
      },
      deleteReview: async (questionId, reviewId) => {
        const url = getBaseReviewApiUrl(questionId, reviewId);
        try { 
          await fetchData(url, 'DELETE');
          return this.actions.getReviews(questionId);
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }

    render() {
        const { state, actions } = this;
        const value = { data: state.data, actions };
        return (
          <Provider value={value}>
            {this.props.children}
          </Provider>
        )
    }
}

function useReviewAPI(WrappedComponent) {
  return (props) => (
    <ReviewConsumer>
      {
        ({data, actions}) => (
          <WrappedComponent 
            reviewData={data} 
            reviewActions={actions} 
            {...props}
          />
        )
      }
    </ReviewConsumer>
  )
}

export {
    ReviewProvider,
    ReviewConsumer,
    useReviewAPI
}