import {combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {conversationsReducer} from './conversations';
import {messagesReducer} from './messages';

const reducers = combineReducers({
  conversationsReducer,
  messagesReducer,
});

export const store = createStore(
    reducers,
    composeWithDevTools()
);
