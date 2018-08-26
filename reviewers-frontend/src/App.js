import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import PageContent from './components/PageContent';
import CodeDetail from './pages/CodeDetail';
import CodeList from './pages/CodeList';
import Login from './pages/Login';
import NewCode from './pages/NewCode';

import { Route } from 'react-router-dom';

const StyledDiv = styled.div`
    * {
        box-sizing: border-box;
    }

    a { text-decoration: none; }
    a:visited { color: inherit; }

    body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }
`;

const menuList = [
    {
        name: 'Codes',
        path: '/code-list'
    },
    {
        name: 'New Code',
        path: '/new-code'
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
                    <Route path="/code-detail/:codeId" component={CodeDetail}/>
                    <Route path="/code-list" component={CodeList}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/new-code" component={NewCode}/>
                </PageContent>
                <Footer />
            </StyledDiv>
        );
    }
}

export default App;
