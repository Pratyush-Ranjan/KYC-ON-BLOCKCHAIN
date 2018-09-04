import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './components/Login';
import Register from './components/Register';
import Bank_file_upload from './components/Bank';
import get_bank_docs from './components/getbankdocs';
import view_bank_docs from './components/viewbankdocs';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/bank' component={Bank_file_upload} />
            <Route path='/verifybank' component={get_bank_docs} />
            <Route path='/viewbankdocs/:bankid' component={view_bank_docs} />
        </div>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();