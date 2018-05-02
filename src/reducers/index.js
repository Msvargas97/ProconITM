import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as networkReducer } from 'react-native-offline';
import accountReducer from "./accountReducer";
import navReducer from './navReducer';
import dialogReducer from './dialogReducer'

const allReducers = combineReducers({
    form: formReducer,
    network: networkReducer,
    account: accountReducer,
    nav: navReducer,
    dialog : dialogReducer
});

export default allReducers;