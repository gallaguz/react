import {createReducer} from 'utils';
import {ADD_CONVERSATION, CHANGE_VALUE} from './types';

const initialState = [
  {title: 'room1', value: ''},
  {title: 'room2', value: ''},
  {title: 'room3', value: ''},
];

export const conversationsReducer = createReducer(initialState, {
  [ADD_CONVERSATION]: (state, {payload}) => {
    return [...state, {title: payload, value: ''}];
  },
  [CHANGE_VALUE]: (state, {payload}) => {
    return state.map((room) =>
        room.title === payload.id ? {...room, value: payload.value} : room,
    );
  },
});
