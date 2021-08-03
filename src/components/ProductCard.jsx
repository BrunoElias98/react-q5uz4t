import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Box,
    Chip,
    Link,
    Typography,
    makeStyles
} from '@material-ui/core';
import { addFavorite, removeFavorite } from 'src/actions';
import { formatPrice } from 'src/utils/functions.js';

import imgFavorite from 'src/theme/img/icon-favorite.svg';
import imgFavoriteChecked from 'src/theme/img/icon-favorite-checked.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        '&:hover': {
            textDecoration: 'none',
        },
    },
    card: {
        height: '100%',
        position: 'relative',
    },
    media: {
        backgroundSize: 'contain',
        height: 300,
        [theme.breakpoints.down('xs')]: {
            height: 130,
        },
    },
    productName: {
        ...theme.components.productCard.productName
    },
    priceOld: {
        ...theme.components.productCard.priceOld
    },
    priceFinal: {
        ...theme.components.productCard.priceFinal
    },
    chipsContainer: {
        position: 'absolute',
        right: '5px',
        top: '5px',
        zIndex: 1,
        [theme.breakpoints.down('xs')]: {
            right: 'auto',
            left: '5px',
        },
    },
    discountTag: {
        fontWeight: 500,
        ...theme.components.productCard.discountTag
    },
    buttonDetail: {
        marginTop: theme.spacing(3),
        ...theme.components.productCard.buttonDetail
    },
    buttonFavorite: {
        width: '100%',
        height: '34px',
        background: '#FFFFFF',
        border: '1.2px solid #72B12C',
        borderRadius: '5px',
        // display: '-webkit-box',
        // display: '-ms-flexbox',
        display: 'flex',
        // -webkit-box-align: 'center',
        // -ms-flex-align: 'center',
        alignItems: 'center',
        // -webkit-box-pack: 'center',
        // -ms-flex-pack: 'center',
        justifyContent: 'center',
        fontWeight: '500',
        fontSize: '11px',
        color: '#72B12C',
        textTransform: 'uppercase',
        // -webkit-transition: 'all .3s',
        // -o-transition: 'all .3s',
        transition: 'all .3s',
        '&:hover': {
            backgroundColor: '#72B12C',
            color: '#ffffff',
            // -webkit-transition:all .3s;
            // -o-transition:all .3s;
            transition: 'all .3s'
        },
    }
}));

function ProductCard({ product, productUrl, isFavorite, withoutPriceAndName, index, isReview, addReview, order, isProductView }) {
    const store = useSelector((state) => state.interface.store);
    const favorites = useSelector((state) => state.interface.favorites);

    const dispatch = useDispatch();
    const classes = useStyles();

    const [isChecked, setIsChecked] = useState(false);

    const hasDiscount = () => {
        let response = false;

        if (product.saleable) {
            if (product.finalPrice !== product.price) {
                response = true;
            }
        }

        return response;
    }

    const getDiscountTag = () => {
        if (!hasDiscount()) {
            return (<></>);
        }

        let label = "-" + ((1 - (product.finalPrice / product.price)) * 100).toFixed(0).toString().replace(".", ",") + "%";
        return (
            <Chip label={label} className={classes.discountTag} color="primary" />
        );
    }

    const getInstalmentRule = (price) => {
        let maxInstalmentQuantity;
        let instalmentQuantity;
        let instalmentPrice;
        let taxes = []
        let minimumInstalmentPrice = 5;

        if (store.name === 'Vinícola Vivalti') {
            taxes = [
                1,
                1,
                1,
            ];
            maxInstalmentQuantity = 3;
        }
        else {
            taxes = [
                1,
                1,
                1.0451,
                1.0604,
                1.0759,
                1.0915,
                1.1072,
                1.1231,
                1.1392,
                1.1554,
                1.1717,
                1.1882,
                1.2048
            ];
            maxInstalmentQuantity = 12;
        }

        instalmentQuantity = Math.floor(price / minimumInstalmentPrice);

        if (instalmentQuantity > maxInstalmentQuantity) {
            instalmentQuantity = maxInstalmentQuantity;
        }

        price = (price * taxes[instalmentQuantity - 1]);

        instalmentPrice = (price / instalmentQuantity);

        return {
            quantity: instalmentQuantity,
            price: instalmentPrice
        }
    }

    const getInstalmentBlock = () => {

        let instalmentRule = getInstalmentRule(product.finalPrice);

        return (
            <Typography component={Box}>
                {instalmentRule.quantity}x de {formatPrice(instalmentRule.price)}
            </Typography>
        )
    }

    const getPriceBlock = () => {

        if (!product.saleable) {
            return (<></>);
        }

        let priceBlock = (<></>);
        let instalmentBlock = getInstalmentBlock();

        if (hasDiscount()) {
            priceBlock = (
                <>
                    <Typography component={Box} className={classes.priceOld}>
                        {formatPrice(product.price)}
                    </Typography>
                    <Typography component={Box} className={classes.priceFinal}>
                        {formatPrice(product.finalPrice)}
                    </Typography>
                </>
            )
        } else {
            priceBlock = (
                <>
                    <Typography component={Box} className={classes.priceFinal}>
                        {formatPrice(product.finalPrice)}
                    </Typography>
                </>
            )
        }

        return (
            <>
                {priceBlock}
                {instalmentBlock}
            </>
        );
    }

    let productImage = store.productPlaceholder;
    if (productUrl !== undefined)
        productImage = productUrl;
    else if (product.medias && product.medias.length) {
        productImage = product.medias[0].url;
    }

    useEffect(() => {
        if (favorites === null)
            return;

        let favoritesChecked = favorites.ids.filter(item => product && item === product.id)[0];

        setIsChecked(favoritesChecked);
    }, [favorites]);

    const getFavoritesById = () => {
        if (!isChecked) {
            return (
                <button type="button" className="js-btn-favorito" onClick={() => dispatch(addFavorite(product.id, ''))}>
                    <img src={imgFavorite} alt="" />
                </button>
            )
        } else {
            return (
                <button type="button" className="js-btn-favorito" onClick={() => dispatch(removeFavorite(product.id))}>
                    <img src={imgFavoriteChecked} alt="" />
                </button>
            )
        }
    };

    const getFavoritesByURL = () => {
        return (
            <>
                <button type="button" className="js-btn-favorito" onClick={() => dispatch(removeFavorite(productUrl))}>
                    <img src={imgFavoriteChecked} alt="" />
                </button>
                <Box mb={1.5}>
                    <img src={productImage} alt="" />
                </Box>
                <Link component={RouterLink} to={{ pathname: '/personalizar-quadro', state: productImage }} className={"btn " + classes.buttonFavorite}>
                    criar meu quadro
                </Link>
            </>
        )
    };

    return (
        <>
            <div className="card-quadro">
                {productUrl !== undefined ?
                    getFavoritesByURL()
                    :
                    <>
                        {getFavoritesById()}

                        {isFavorite ? (
                            <>
                                <Box mb={1.5}>
                                    <img src={productImage} alt="" />
                                </Box>
                                <Link component={RouterLink} to={`/personalizar-quadro/${product && product.url}`} className={"btn " + classes.buttonFavorite}>
                                    criar meu quadro
                                </Link>
                            </>
                        ) : withoutPriceAndName ? (
                            <Link component={RouterLink} to={`/detalhe-categoria/${product && product.url}`} className="image">
                                <img src={productImage} alt="" />
                            </Link>
                        ) : (
                            <>
                                <Link component={RouterLink} to={`/${product && product.url}`} className="image">
                                    <img src={productImage} alt="" />
                                </Link>
                                <p>
                                    {product && product.name}
                                </p>
                                <h4>{product && formatPrice(product.price)}</h4>
                            </>
                        )}
                    </>
                }
            </div>
        </>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductCard;
