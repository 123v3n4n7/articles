import { combineReducers} from 'redux';
import articles from "./articles";
import authReducers from './auth';

const mainApp = combineReducers({
    articles, authReducers,
});

export default mainApp;

