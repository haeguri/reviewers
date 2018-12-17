import React, { createContext } from 'react';
import { fetchData } from '../utils/http';
import { BASE_API_URL } from './const';

const BASE_REVIEW_API_URL = BASE_API_URL + '/questions';

const {
    Consumer: ReviewConsumer,
    Provider
} = createContext();

class ReviewProvider extends React.Component {
    state = {
        data: []
    }

    actions = {
        newReview: (data) => {
            const { questionId } = data;
            return fetchData(`${BASE_REVIEW_API_URL}/${questionId}/reviews/new`, 'POST', data)
                    .then(json => {
                        return this.getReviews(questionId);
                    });
        },
        getReviews: (questionId) => {
            return fetchData(`${BASE_REVIEW_API_URL}/${questionId}/reviews`, 'GET')
                .then(json => {
                    this.setState({
                        data: json.data
                    });

                    return Promise.resolve(json);
                });
        },
        updateReview: (data) => {
            const { questionId, id } = data;
            return fetchData(`${BASE_REVIEW_API_URL}/${questionId}/reviews/${id}`, 'PUT', data)
                    .then(json => {
                        return this.getReviews(questionId);
                    });
        },
        deleteReview: (id) => {
            const { questionId } = data;
            return fetchData(`${BASE_REVIEW_API_URL}/${questionId}/reviews/${id}`, 'DELETE')
                    .then(json => {
                        return this.getReviews(questionId);
                    });
        }
    }

    render() {
        const { state, actions } = this;
        const value = { state, actions };
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
}

export {
    ReviewProvider,
    ReviewConsumer
}