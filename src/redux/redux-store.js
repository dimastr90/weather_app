import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import mainReducer from "./mainReducer";


let reducers = combineReducers({
    mainReducer: mainReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;