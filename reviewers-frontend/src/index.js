import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-free/css/all.css'
import { 
  faPlusCircle, 
  faMinusCircle, 
  faAngleDoubleLeft, 
  faAngleDoubleRight ,
  faAngleLeft,
  faAngleRight,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// add font-awesome icons into fontawesome library..
library.add(
  faPlusCircle, 
  faMinusCircle, 
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faEdit,
  faTrashAlt
);

const noop = () => {}
if (process.env.NODE_ENV !== 'development') {
  console.log = noop;
  console.warn = noop;
  console.error = noop;
}

ReactDOM.render(
    <Router>
        <Route component={App} />
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();