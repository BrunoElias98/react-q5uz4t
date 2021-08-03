import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import {
    makeStyles,
    useTheme,
    Link,
    useMediaQuery,
} from '@material-ui/core';
import { handleOpenMenuCustomerData, addMessage } from 'src/actions';
import { validateUser } from 'src/utils/functions';
import DrawerCategories from 'src/layouts/MainLayout/Topbar/Menu/DrawerCategories';
import DrawerCart from 'src/layouts/MainLayout/Cart';
import DrawerLogin from 'src/layouts/MainLayout/Login';
import DrawerData from 'src/layouts/MainLayout/MyData';
import DrawerOrders from 'src/layouts/MainLayout/MyOrders';
import Categories from 'src/layouts/MainLayout/Topbar/Menu/Categories';

import imgIconSearch from 'src/theme/img/icon-search.svg';
import imgIconMobile from "src/theme/img/icon-menu-mobile.svg";
import iconMyData from 'src/theme/img/icon-meus-dados.svg';
import iconMyOrders from 'src/theme/img/icon-pedidos.svg';
import imgLogo from 'src/theme/img/logo.svg';
import iconLupaSearch from 'src/theme/img/icon-lupa-white.svg';
import iconCloseSearch from 'src/theme/img/close-search.svg';

const useStyles = makeStyles(() => ({
    textDecorationNone: {
        textDecoration: 'none !important'
    },
    styleLink: {
        cursor: 'pointer'
    }
}));

function TopBar() {
    const store = useSelector((state) => state.interface.store);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const cartRef = useRef(null);

    const [openDrawer, setOpenDrawer] = useState(null);
    const [openMenuMobile, setOpenMenuMobile] = useState(false);
    const [displayAreaSearch, setDisplayAreaSearch] = useState(false);

    const theme = useTheme();
    const mobileSize = !(useMediaQuery(theme.breakpoints.up('sm')));

    const userAccount = useSelector((state) => state.account.user);
    const cartOrder = useSelector((state) => state.cart.order);
    const favorites = useSelector((state) => state.interface.favorites);
    const menuCustomerData = useSelector((state) => state.interface.menuCustomerData);

    let quantity = 0;

    if (cartOrder.items.length > 1) {
        quantity = cartOrder.items.map(item => parseInt(item.quantity));
    } else if (cartOrder.items.length === 1) {
        quantity = cartOrder.items.map(item => item.quantity);
    }

    let quantityOrderCart = quantity.length > 0 ? quantity.reduce((acc, current) => acc + current) : 0;
    let quantityFavorites = '0';

    if (favorites !== null)
        quantityFavorites = favorites.ids.length;

    const handleDrawerOpen = (drawerId) => {
        if (openDrawer === drawerId) {
            drawerId = null
        }
        setOpenDrawer(drawerId);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(null);
    };

    const handleOpenMenuData = () => {
        if (menuCustomerData.open) {
            if (userAccount?.document !== null) {
                dispatch(handleOpenMenuCustomerData(false));
            } else {
                if (validateUser(userAccount)) {
                    dispatch(addMessage('Você precisa fazer o cadastro do CPF e telefone', 'error'));
                }
            }
        } else {
            dispatch(handleOpenMenuCustomerData(true));
        }
    };

    useEffect(() => {
        if (quantityOrderCart > 0) {
            if (cartRef.current) {
                cartRef.current.className = cartRef.current.className + ' shopping-cart';
            }
        }

        setTimeout(() => {
            if (cartRef.current) {
                cartRef.current.className = 'MuiBadge-root';
            }
        }, 1000);

    }, [cartOrder.items]);

    const handleOpenMenuMobile = () => {
        openMenuMobile ? setOpenMenuMobile(false) : setOpenMenuMobile(true);
    };

    const handleDisplayAreaSearch = () => {
        displayAreaSearch ? setDisplayAreaSearch(false) : setDisplayAreaSearch(true);
    };

    return (
        <>
            <header>
                <div className="offers">
                    <div className="slide-offers">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <p>FRETE GRÁTIS <strong>ACIMA DE R$199 ∙ 5% OFF</strong> NO BOLETO</p>
                            </div>
                            <div className="swiper-slide">
                                <p>FRETE GRÁTIS <strong>ACIMA DE R$100 ∙ 15% OFF</strong> NO BOLETO</p>
                            </div>
                            <div className="swiper-slide">
                                <p>FRETE GRÁTIS <strong>ACIMA DE R$200 ∙ 50% OFF</strong> NO BOLETO</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-area">
                    <div className="container">
                        <div className="cont">
                            <a onClick={handleOpenMenuMobile} className="menu-button js-open-menu-main">
                                <img src={imgIconMobile} alt="" />
                            </a>
                            <div className="left">
                                <button type="button" onClick={handleDisplayAreaSearch}>
                                    <div className="icon-search"></div>
                                </button>
                                <div className="user" style={{ display: userAccount !== null ? '' : 'none' }}>
                                    <button className="meu-dados js-meus-dados" onClick={() => handleOpenMenuData()}>
                                        <img src={iconMyData} alt="" />
                                        <span>Meus<br />  Dados</span>
                                    </button>
                                    <button className="meu-dados js-meus-pedidos" onClick={() => handleDrawerOpen('myOrders')}>
                                        <img src={iconMyOrders} alt="" />
                                        <span>Meus<br />  Pedidos</span>
                                    </button>
                                </div>
                                <div className="user js-aside-user" style={{ display: userAccount === null ? '' : 'none' }}>
                                    <div className="icon"></div>
                                    <div className="info" onClick={() => handleDrawerOpen('login')}>
                                        <a href="#">entrar</a> ou<br />
                                        <a href="#">cadastre-se</a>
                                    </div>
                                </div>
                                <div className={displayAreaSearch ? "area-search show-area-search" : "area-search"} id="area-search">
                                    <Formik
                                        initialValues={{ term: '' }}
                                        enableReinitialize
                                        onSubmit={async (values) => {
                                            history.push('/search?query=' + values.term);
                                        }}
                                    >
                                        {({
                                            handleBlur,
                                            handleSubmit,
                                            setValues,
                                            values,
                                            handleChange
                                        }) => {

                                            return (
                                                <Form
                                                    onSubmit={handleSubmit}
                                                >
                                                    <input
                                                        type="text"
                                                        placeholder="Estou procurando por…"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        name="term"
                                                        value={values.term}
                                                    />
                                                    <div className="btns">
                                                        <button className="btn-green js-submit-search" type="submit">
                                                            <img src={iconLupaSearch} alt="" />
                                                        </button>
                                                        <button type="button" id="js-close-search" onClick={handleDisplayAreaSearch}>
                                                            <img src={iconCloseSearch} alt="" />
                                                        </button>
                                                    </div>
                                                </Form>
                                            )
                                        }}
                                    </Formik>
                                </div>
                            </div>
                            <Link component={RouterLink} to="/" className="logo" title="On The Wall">
                                <img src={imgLogo} alt="" />
                            </Link>
                            <div className="right">
                                <ul>
                                    <li>
                                        <Link component={RouterLink} to="/wishlist" className={"icon-favorite " + classes.textDecorationNone}>
                                            <div className="icon"></div>
                                            <span>{quantityFavorites}</span>
                                        </Link>
                                    </li>
                                    <li className="search-mb">
                                        <a href="" className="js-open-search-mobile">
                                            <img src={imgIconSearch} alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a className={"js-open-carrinho icon-carrinho " + classes.styleLink} onClick={() => handleDrawerOpen('cart')}>
                                            <div className="icon"></div>
                                            <span>{quantityOrderCart}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {store.interface.hasCategoriesMenu && !mobileSize && (
                    <Categories />
                )}
            </header>

            <DrawerCart handleDrawerClose={handleDrawerClose} openDrawer={openDrawer === 'cart'} />
            <DrawerData handleDrawerClose={() => handleOpenMenuData()} openDrawer={menuCustomerData.open} />
            <DrawerOrders handleDrawerClose={handleDrawerClose} openDrawer={openDrawer === 'myOrders'} />
            {openMenuMobile && (
                <div className='open-menu-main'>
                    <DrawerCategories handleDrawerClose={handleDrawerClose} openDrawer={openDrawer === 'categories'} />
                </div>
            )}
            {openDrawer === 'login' && (
                <DrawerLogin handleDrawerClose={handleDrawerClose} openDrawer={openDrawer === 'login'} />
            )}
        </>
    );
}

TopBar.propTypes = {
    className: PropTypes.string
};

export default TopBar;
