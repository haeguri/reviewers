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

    }

    actions = {
        getReviews: (questionId) => {

        },
        newReview: (data) => {

        },
        updateReview: (data) => {

        },
        deleteReview: (id) => {

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