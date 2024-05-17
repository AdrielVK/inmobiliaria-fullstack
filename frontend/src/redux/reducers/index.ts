// redux/reducers/index.ts
import { combineReducers } from 'redux';
import auth from './auth';
import posts from './posts';
import messages from './messages';

export const rootReducer = combineReducers({
    auth: auth,
    posts: posts,
    messages: messages
});

export type RootState = ReturnType<typeof rootReducer>;