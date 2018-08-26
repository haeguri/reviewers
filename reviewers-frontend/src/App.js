import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import PageContent from './components/PageContent';
import QuestionDetail from './pages/QuestionDetail';
import QuestionList from './pages/QuestionList';
import Login from './pages/Login';
import NewQuestion from './pages/NewQuestion';

import { Route } from 'react-router-dom';

const StyledDiv = styled.div`
    * {
        box-sizing: border-box;
    }

    a, a:visited { text-decoration: none; color: inherit; }

    body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }
`;

const menuList = [
    {
        name: 'Questions',
        path: '/question-list'
    },
    {
        name: 'New Question',
        path: '/new-question'
    },
    {
        name: 'Login',
        path: '/login'
    }
]
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <StyledDiv className="app-container">
                <Header menuList={menuList}/>
                <PageContent>
                    <Route path="/question-detail/:qId" component={QuestionDetail}/>
                    <Route path="/question-list" component={QuestionList}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/new-question" component={NewQuestion}/>
                </PageContent>
                <Footer />
            </StyledDiv>
        );
    }
}

export default App;
