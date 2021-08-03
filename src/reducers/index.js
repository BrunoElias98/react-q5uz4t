import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import interfaceReducer from './interfaceReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    account: accountReducer,
    interface: interfaceReducer,
    cart: cartReducer
});

export default rootReducer;
