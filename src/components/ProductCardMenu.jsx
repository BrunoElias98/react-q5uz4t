import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { formatPrice } from 'src/utils/functions.js';

import {
    Box,
    Chip,
    Card,
    Grid,
    CardMedia,
    CardContent,
    CardActionArea,
    Link,
    Typography,
    Button,
} from '@material-ui/core';
import {
    ChevronRight as ChevronRightIcon
} from 'react-feather';

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
        height: 150,
        width: 150,
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
    }
}));

function ProductCard({ product, isReview, addReview, order, mobile }) {

    const store = useSelector((state) => state.interface.store);

    const classes = useStyles();

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
        }
        else {
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
    if (product.medias && product.medias.length) {
        productImage = product.medias[0].url;
    }

    return (
        <>
            <Link
                to={`/${product.url}`}
                component={RouterLink}
                className={classes.root}
            >
                <Card className={classes.card}>
                    <Grid container alignItems="center">
                        <Grid item xs={mobile ? 12 : 2} md={2}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={productImage}
                                    title={product.name}
                                />
                            </CardActionArea>
                        </Grid>
                        <Grid item xs={mobile ? 12 : 10} md={10}>
                            <CardContent>
                                <Typography className={classes.productName} gutterBottom variant="h5" component={Box}>
                                    {product.name}
                                </Typography>
                                {getPriceBlock()}
                                <Button className={classes.buttonDetail} variant="contained" color="primary" fullWidth >Ver detalhes <ChevronRightIcon size={14} /></Button>
                            </CardContent>
                        </Grid>
                    </Grid>
                    <Box className={classes.chipsContainer} display="flex" flexDirection="column">
                        {getDiscountTag()}
                        {!product.saleable && (
                            <Chip label="Indisponível" className={classes.chipsContainerItem} disabled />
                        )}
                    </Box>
                </Card>
            </Link>
            {isReview && (
                <Box display="flex" flexDirection="column">
                    <Button variant='outlined' color='primary' onClick={() => addReview(order[0].id, product.id)}>
                        Avaliar
                    </Button>
                </Box>
            )}
        </>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductCard;
