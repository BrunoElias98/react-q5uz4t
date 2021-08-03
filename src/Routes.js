/* eslint-disable react/no-array-index-key */
import React, {
    lazy,
    Suspense,
    Fragment
} from 'react';
import {
    Switch,
    Redirect,
    Route
} from 'react-router-dom';
import MainLayout from 'src/layouts/MainLayout/index';
import CustomerAccountLayout from 'src/layouts/CustomerAccountLayout/index';
import CheckoutLayout from 'src/layouts/CheckoutLayout/index';
import HomeView from 'src/views/Home';
import ContentView from 'src/views/Content';
import LoadingScreen from 'src/components/LoadingScreen';

const routesConfig = [
    {
        exact: true,
        path: '/404',
        component: lazy(() => import('src/views/Error404'))
    },
    {
        path: '/customer/account',
        layout: CustomerAccountLayout,
        routes: [
            {
                exact: true,
                path: '/customer/account',
                // component: lazy(() => import('src/views/Customer/Account/Dashboard'))
                component: () => <Redirect to="/customer/account/edit" />
            },
            {
                exact: true,
                path: '/customer/account/orders',
                component: lazy(() => import('src/views/Customer/Account/Orders/List'))
            },
            {
                exact: true,
                path: '/customer/account/orders/:id',
                component: lazy(() => import('src/views/Customer/Account/Orders/View'))
            },
            {
                exact: true,
                path: '/customer/account/edit',
                component: lazy(() => import('src/views/Customer/Account/Edit'))
            },
            {
                exact: true,
                path: '/customer/account/addresses',
                component: lazy(() => import('src/views/Customer/Account/Addresses/List'))
            },
            {
                exact: true,
                path: [
                    '/customer/account/addresses/new',
                    '/customer/account/addresses/:id'
                ],
                component: lazy(() => import('src/views/Customer/Account/Addresses/View'))
            },
            {
                exact: true,
                path: '/customer/account/reviews',
                component: lazy(() => import('src/views/Customer/Account/Reviews/List'))
            },
            {
                exact: true,
                path: [
                    // '/customer/account/addresses/new',
                    '/customer/account/reviews/:id'
                ],
                component: lazy(() => import('src/views/Customer/Account/Reviews/View'))
            },
        ]
    },
    {
        path: '/onestepcheckout',
        layout: CheckoutLayout,
        routes: [
            {
                exact: true,
                path: '/onestepcheckout',
                component: lazy(() => import('src/views/Checkout/index.jsx'))
            },
        ]
    },
    {
        path: '*',
        layout: MainLayout,
        routes: [

            // Rotas padrões do eStart

            {
                exact: true,
                path: '/',
                component: HomeView
            },

            {
                exact: true,
                path: '/cart/share/:id',
                component: lazy(() => import('src/views/Cart/Share/index.jsx'))
            },

            {
                exact: true,
                path: '/customer/register',
                component: lazy(() => import('src/views/Customer/Register'))
            },

            {
                exact: true,
                path: '/customer/register/success',
                component: lazy(() => import('src/views/Customer/RegisterSuccess'))
            },

            {
                exact: true,
                path: '/user/recovery/:token',
                component: lazy(() => import('src/views/Customer/RecoveryPassword'))
            },

            {
                exact: true,
                path: '/search',
                component: lazy(() => import('src/views/Catalog/Search'))
            },
            
            {
                exact: true,
                path: '/wishlist',
                component: lazy(() => import('src/views/Customer/MyFavorites'))
            },

            // Rotas específicas dos clientes com tema eStart (mover para páginas no futuro)

            {
                exact: true,
                path: '/personalizar-quadro/:url',
                component: lazy(() => import('src/views/Catalog/Product/ProductDetail/Personalization'))
            },
            {
                exact: true,
                path: '/personalizar-quadro',
                component: lazy(() => import('src/views/Catalog/Product/ProductDetail/Personalization'))
            },
            {
                exact: true,
                path: '/detalhe-categoria/:url',
                component: lazy(() => import('src/views/Catalog/Product/ProductDetail'))
            },
            {
                exact: true,
                path: '/como-funciona',
                component: lazy(() => import('src/views/Pages/HowToWork'))
            },
            {
                exact: true,
                path: '/canvas',
                component: lazy(() => import('src/views/Pages/Canvas'))
            },
            {
                exact: true,
                path: '/comece-seu-quadro',
                component: lazy(() => import('src/views/Pages/StartBoard'))
            },
            {
                exact: true,
                path: '/tipos-de-quadros',
                component: lazy(() => import('src/views/Pages/FrameTypes'))
            },
            {
                exact: true,
                path: '/precos-quadros',
                component: lazy(() => import('src/views/Pages/FramePrices'))
            },
            {
                exact: true,
                path: '/perguntas-frequentes',
                component: lazy(() => import('src/views/Pages/GeneralDoubts'))
            },
            {
                exact: true,
                path: '/fale-conosco',
                component: lazy(() => import('src/views/Pages/ContactUs'))
            },
            {
                exact: true,
                path: '/loja-confiavel',
                component: lazy(() => import('src/views/Pages/TrustedStore'))
            },
            {
                exact: true,
                path: '/quadros-personalizados',
                component: lazy(() => import('src/views/Pages/CustomFrames'))
            },
            {
                exact: true,
                path: '/quadros-decorativos',
                component: lazy(() => import('src/views/Pages/DecorativeFrames'))
            },
            {
                exact: true,
                path: '/comprar-quadros-online',
                component: lazy(() => import('src/views/Pages/DecorativeFramesOnline'))
            },
            {
                exact: true,
                path: '/termos-uso',
                component: lazy(() => import('src/views/Pages/TermsOfUse'))
            },
            {
                exact: true,
                path: '/direito-arrependimento',
                component: lazy(() => import('src/views/Pages/RightOfRegret'))
            },
            {
                exact: true,
                path: '/politica-de-privacidade',
                component: lazy(() => import('src/views/Pages/PrivatePolicy'))
            },
            {
                exact: true,
                path: '/checkout-success/:entityId',
                component: lazy(() => import('src/views/Checkout/Success'))
            },

            // Rotas dinâmica

            {
                exact: false,
                component: lazy(() => import('src/views/Catalog/index.jsx'))
            },

        ]
    },

];

const renderRoutes = (routes) => (routes ? (
    <Suspense fallback={<LoadingScreen />}>
        <Switch>
            {routes.map((route, i) => {
                const Guard = route.guard || Fragment;
                const Layout = route.layout || Fragment;
                const Component = route.component;

                return (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <Guard>
                                <Layout>
                                    {route.routes
                                        ? renderRoutes(route.routes)
                                        : <Component {...props} />}
                                </Layout>
                            </Guard>
                        )}
                    />
                );
            })}
        </Switch>
    </Suspense>
) : null);

function Routes() {
    return renderRoutes(routesConfig);
}

export default Routes;
