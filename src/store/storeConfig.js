import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let finalCreateStore = composeEnhancers(applyMiddleware(thunk))(createStore)


export default function configureStore(initState) {
	return finalCreateStore(reducer, initState)
}