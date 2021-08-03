import React, {
    useEffect,
    useState
} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import SplashScreen from 'src/components/SplashScreen';
import { setUserData, logout } from 'src/actions/accountActions';
import authService from 'src/services/authService';

import { setStore, addCategoriesMenu, addAttributesMenu, fetchCart } from 'src/actions';
import ManagerApi from 'src/services/managerApi';

function Auth({ children }) {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {

            let response;

            const companyApi = new ManagerApi('/company');
            response = await companyApi.getList({ domain: window.location.host });
            if (response.data.success) {
                await dispatch(setStore(response.data.content[0]));
            }

            authService.handleAuthentication();
            if (authService.isAuthenticated()) {
                const user = await authService.loginInWithToken();
                if (user) {
                    await dispatch(setUserData(user));
                }
                else {
                    await dispatch(logout());
                }
            }
            else {
                let orderId = localStorage.getItem('orderId');
                dispatch(fetchCart(orderId));
            }

            const categoriesApi = new ManagerApi('/catalog/category');
            response = await categoriesApi.getList({ paginator: { sortOrder: { sortOrder: 'ASC', name: 'ASC' } } });
            if (response.data.success) {
                await dispatch(addCategoriesMenu(response.data.content));
            }

            const attributeApi = new ManagerApi('/catalog/attribute');
            response = await attributeApi.getList({ paginator: { sortOrder: { name: 'ASC' } } });
            if (response.data.success) {
                await dispatch(addAttributesMenu(response.data.content));
            }

            setLoading(false);
        };

        initAuth();
    }, [dispatch]);

    if (isLoading) {
        return <SplashScreen />;
    }

    return children;
}

Auth.propTypes = {
    children: PropTypes.any
};

export default Auth;
