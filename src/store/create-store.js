import {combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {conversationReducer} from './conversations';
import {messageReducer} from './messages';

const reducers = combineReducers({conversationReducer, messageReducer});

export const store = createStore(
    reducers,
    composeWithDevTools()
);
