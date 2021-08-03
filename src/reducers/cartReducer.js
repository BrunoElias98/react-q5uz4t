// import produce from 'immer';
import {
    FETCH_CART,
    UPDATED_CART,
    CLEAR_CART,
    LOGOUT
} from 'src/actions';

const initialState = {
    order: {
        id: '',
        items: []
    }
};

const cartReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case FETCH_CART: {
            let newState = { ...state };
            return newState;
        }

        case UPDATED_CART: {
            let newState = {
                order: {
                    ...action.payload,
                    attributes: action.attributes
                }
            };

            return newState;
        }

        case LOGOUT: {
            return initialState;
        }

        case CLEAR_CART: {
            return initialState;
        }

        default: {
            return state;
        }
    }
};

export default cartReducer;
