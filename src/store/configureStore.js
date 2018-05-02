// Redux Store Configuration
import { createStore, applyMiddleware } from 'redux';
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import allReducers from "../reducers";
//Redux saga
import createSagaMiddleware from 'redux-saga';
import rootSagas from '../sagas/rootSagas';

//navigation middleware
const navigationMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);
export const addListener = createReduxBoundAddListener("root");
//saga middleware
const sagaMiddleware = createSagaMiddleware();

//const store = (initialState) => createStore(allReducers, initialState,applyMiddleware(sagaMiddleware));
const store = createStore(allReducers, 
    applyMiddleware(sagaMiddleware, navigationMiddleware));
    
sagaMiddleware.run(rootSagas);

export default store;