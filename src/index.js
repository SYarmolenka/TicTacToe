import React from 'react';
import {render} from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {HashRouter} from 'react-router-dom';
import combineReducers from './reducers/index';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './app';

const store = createStore(combineReducers, composeWithDevTools(applyMiddleware(thunk)));

const root = document.getElementById('root');
root.className = 'box gradDynamic';

render(
  <Provider store={store}>
    <HashRouter onChange={console.log(`have changed route`)}>
      <App />
    </HashRouter>
  </Provider>, root);
registerServiceWorker();
