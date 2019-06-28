import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import './styles/styles.scss';
import MatchUI from './MatchUI';

const Main = (props) => (
    <BrowserRouter>
        <div className="mainContainer">
            <div className="headerContainer"></div>
            <div className="bodyContainer">
                <Route path="/" exact component={MatchUI} />
            </div>
            <div className="footerContainer">Tennis score keeper</div>
        </div>
    </BrowserRouter>
)
ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
