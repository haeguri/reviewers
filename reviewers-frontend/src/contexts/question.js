import React, { createContext } from 'react';
import { fetchData } from '../utils/http';
import { BASE_API_URL } from './const';

const BASE_REVIEW_API_URL = BASE_API_URL + '/questions';

const {
    Consumer: QuestionConsumer,
    Provider
} = createContext();

class QuestionProvider extends React.Component {
    state = {

    }

    actions = {
        getQuestions: () => {

        },
        detailQuestion: (id) => {

        },
        newQuestion: (data) => {

        },
        updateQuestion: (data) => {

        },
        deleteQuestion: (id) => {

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
    QuestionProvider,
    QuestionConsumer
}