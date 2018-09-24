import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// add font-awesome icons into library..
library.add(faPlusCircle, faMinusCircle);

ReactDOM.render(
    <Router>
        <Route component={App} />
    </Router>,
    document.getElementById('root'));
registerServiceWorker();

