import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import './index.css';
import App from './containers/app';
import * as serviceWorker from './serviceWorker';
import GameStore from './models/GameStore';
//debugging tools
//import {onPatch} from 'mobx-state-tree';
//import makeInspectable from 'mobx-devtools-mst';

Array.prototype.shuffle = function () {
    // Fisher-Yates shuffle
    let currentIndex = this.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = this[currentIndex];
        this[currentIndex] = this[randomIndex];
        this[randomIndex] = temporaryValue;
    }

    return this;
};

const store = GameStore.create({});
// makeInspectable(store);
//
// onPatch(store, patch => {
//     console.log(patch)
// });

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
