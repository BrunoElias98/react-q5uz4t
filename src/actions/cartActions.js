import ManagerApi from 'src/services/managerApi';
import { addMessage, addLoadingGlobal, removeLoadingGlobal } from 'src/actions';
import { v4 as uuidv4 } from 'uuid';

export const FETCH_CART = 'FETCH_CART';
export const UPDATED_CART = 'UPDATED_CART';
export const CLEAR_CART = 'CLEAR_CART';

export function addProductCart(productId, quantity) {
    return async (dispatch, getState) => {

        const { cart } = getState();

        try {
            const requestId = uuidv4();
            dispatch(addLoadingGlobal(requestId));

            let apiUrl = '/sale/order';
            if (cart.order.id) {
                apiUrl = apiUrl + '/' + cart.order.id;
            }

            const saleOrderApi = new ManagerApi(apiUrl);
            let data = new FormData();
            data.append('items[0][product]', productId);
            data.append('items[0][quantity]', quantity);
            const response = await saleOrderApi.post(data);

            dispatch(removeLoadingGlobal(requestId));
            if (response.data.success) {
                dispatch(addMessage('Produto adicionado no seu carrinho', 'success'))
                dispatch({
                    type: UPDATED_CART,
                    payload: response.data.content
                });
                
                localStorage.setItem('orderId', response.data.content.id);
                return true;
            } else {
                dispatch(fetchCart(cart.order.id));
                return false;
            }            
        } catch (error) {
            return error;
        }
    };
};

export function fetchCart(orderId) {
    return async (dispatch) => {
        try {
            if (orderId) {
                localStorage.setItem('orderId', orderId);

                const requestId = uuidv4();
                dispatch(addLoadingGlobal(requestId));

                const saleOrderApi = new ManagerApi('/sale/order');
                const response = await saleOrderApi.get(orderId);

                dispatch(removeLoadingGlobal(requestId));

                if (response.data.success && response.data.content && response.data.content.id) {
                    dispatch({
                        type: UPDATED_CART,
                        payload: response.data.content
                    })
                }
                else {
                    dispatch(addMessage('O seu carrinho expirou.', 'error'))
                    localStorage.removeItem('orderId');
                    dispatch({
                        type: CLEAR_CART,
                    })    
                }
            }
            else {
                localStorage.removeItem('orderId');
                dispatch({
                    type: CLEAR_CART,
                })
            }
        } catch (error) {
            return error;
        }
    };
};

export function deleteItemCart(itemId) {
    return async (dispatch, getState) => {

        const { cart } = getState();

        try {
            const requestId = uuidv4();
            dispatch(addLoadingGlobal(requestId));

            const saleOrderApi = new ManagerApi('/sale/order/' + cart.order.id);
            let data = {
                items: [{
                    id: itemId,
                    delete: 1
                }]
            };
            const response = await saleOrderApi.post(data);

            dispatch(removeLoadingGlobal(requestId));

            if (response.data.success) {
                dispatch(addMessage('Produto removido do seu carrinho', 'success'));
                dispatch({
                    type: UPDATED_CART,
                    payload: response.data.content
                })
            }
            else {
                dispatch(fetchCart(cart.order.id));
            }

            return true;
        }
        catch (e) {
            return e;
        }
    };
};

export function updateItemCart(itemId, itemQuantity) {
    return async (dispatch, getState) => {

        const { cart } = getState();

        try {
            const requestId = uuidv4();
            dispatch(addLoadingGlobal(requestId));

            const saleOrderApi = new ManagerApi('/sale/order/' + cart.order.id);
            let data = {
                items: [{
                    id: itemId,
                    quantity: itemQuantity
                }]
            };
            const response = await saleOrderApi.post(data);

            dispatch(removeLoadingGlobal(requestId));

            if (response.data.success) {
                dispatch(addMessage('Produto atualizado no seu carrinho', 'success'));
                dispatch({
                    type: UPDATED_CART,
                    payload: response.data.content
                });
            }
            else {
                dispatch(fetchCart(cart.order.id));
            }

            return true;
        }
        catch (e) {
            return e;
        }
    };
};

export const clearCart = (id) => (dispatch) => dispatch({
    type: CLEAR_CART,
    id: id
});