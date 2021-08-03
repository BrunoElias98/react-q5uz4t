import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { clearCart, fetchFavorites, addMessage, handleOpenMenuCustomerData } from 'src/actions';
import { validateUser } from 'src/utils/functions';
import TopBar from 'src/layouts/MainLayout/Topbar/TopBar';
import Footer from 'src/layouts/MainLayout/Footer';

function MainLayout({ children }) {
    const dispatch = useDispatch();
    const userAccount = useSelector((state) => state.account.user);
    const cart = useSelector((state) => state.cart);
    
    if (localStorage.getItem('favorites') === null) {
        localStorage.setItem('favorites', JSON.stringify([]));
    } else {
        dispatch(fetchFavorites(JSON.parse(localStorage.getItem('favorites'))));
    };

    if (cart.order.status !== 'new') {
        dispatch(clearCart());
    };

    useEffect(() => {
        if (userAccount !== null)
            if (validateUser(userAccount)) {
                dispatch(handleOpenMenuCustomerData(true));
                dispatch(addMessage('Você precisa fazer o cadastro do CPF e telefone.', 'error'));
                return;
            } else {
                dispatch(handleOpenMenuCustomerData(false));
            }
    }, [userAccount]);

    return (
        <>
            <TopBar />
            <div id="page-content">
                {children}
                <Footer />
            </div>
        </>
    );
}

MainLayout.propTypes = {
    children: PropTypes.any
};

export default MainLayout;
