import { thunk } from 'redux-thunk';
import { createStore, applyMiddleware, Store } from 'redux';
import {rootReducer } from './reducers'; 
import { RootAction } from '@/Interfaces/AuthInterfaces';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState } from './reducers';

const store: Store<RootState, RootAction> = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
