import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer/index';

let finalCreateStore = compose(applyMiddleware(thunk))(createStore)


export default function configureStore(initState) {
	return finalCreateStore(reducer, initState)
}