// src/redux/store.ts
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { dataReducer } from './redux/reducers';
import { composeWithDevTools } from 'redux-devtools-extension'; // Optional for debugging
import { useDispatch } from 'react-redux';

const store = createStore(
  dataReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
