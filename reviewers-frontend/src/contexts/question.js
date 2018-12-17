import React, { createContext } from 'react';
import { fetchData } from '../utils/http';
import { BASE_API_URL } from './const';

const BASE_QUESTION_API_URL = BASE_API_URL + '/questions';

const {
    Consumer: QuestionConsumer,
    Provider
} = createContext();

class QuestionProvider extends React.Component {
    state = {
        data: []
    }

    actions = {
        newQuestion: (data) => {
            return fetchData(`${BASE_QUESTION_API_URL}/new`, 'POST', data)
                .then(json => {
                    return Promise.resolve(json);
                });
        },
        getQuestions: () => {
            return fetchData(`${BASE_QUESTION_API_URL}`, 'GET')
                .then(json => {
                    this.setState({
                        data: json
                    });

                    return Promise.resolve(json);
                });
        },
        detailQuestion: (id) => {
            return fetchData(`${BASE_QUESTION_API_URL}/${id}`, 'GET')
                .then(json => {
                    return Promise.resolve(json);
                });
        },
        updateQuestion: (data) => {
            const { id } = data;
            return fetchData(`${BASE_QUESTION_API_URL}/${id}`, 'PUT')
                .then(json => {
                    return this.detailQuestion(id);
                });
        },
        deleteQuestion: (id) => {
            return fetchData(`${BASE_QUESTION_API_URL}/${id}`, 'DELETE')
                .then(json => {
                    // @TODO
                    return this.getQuestions();
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
    QuestionProvider,
    QuestionConsumer
}