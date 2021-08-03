import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swiper from 'react-id-swiper';
import InputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import {
    makeStyles,
    Container,
    Grid,
    Typography,
    Box,
    useMediaQuery,
    useTheme,
    Chip,
} from '@material-ui/core';
import { formatPrice, formatPriceBlock } from 'src/utils/functions.js';
import { Alert } from '@material-ui/lab';
import ManagerApi from 'src/services/managerApi';
import Slider from 'src/components/Slider/Slider';
import { addProductCart, addLoadingGlobal, removeLoadingGlobal, addMessage } from 'src/actions';
import ProductCard from 'src/components/ProductCard';
import HTMLView from 'src/components/HTMLView';
import ClassValidateZipcode from 'src/models/ValidateZipCodeModels';
import DrawerCart from 'src/layouts/MainLayout/Cart';

import arrowZipcode from 'src/theme/img/arrow-right-white.svg';
import iconClose from 'src/theme/img/icon-close-menu.svg';
import iconOk from 'src/theme/img/icon-ok.svg';

let classValidateZipcode = new ClassValidateZipcode();

const defaultFormShape = classValidateZipcode.getObjects;

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    divider: {
        width: 1,
        height: '100%',
    },
    heartIcon: {
        color: '#ff0854',
        "&:active": {
            fill: "#ff0854",
        },
    },
    priceOld: {
        ...theme.components.productView.priceOld
    },
    priceFinal: {
        ...theme.components.productView.priceFinal
    },
    discountTag: {
        ...theme.components.productView.discountTag
    },
    buttonAddToCart: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        ...theme.components.productView.buttonAddToCart,
    },
    buttonOk: {
        paddingTop: '15px',
        paddingBottom: '15px',
    },
    validateZipCode: {
        borderColor: '#f44336'
    },
    swiperMainContainer: {
        '& .swiper-pagination-bullet-active': {
            border: '3px solid #72B12C !important'
        },
        '& .swiper-pagination': {
            marginTop: '40px'
        }
    },
    swiperMainSlide: {
        minHeight: '250px',
        marginRight: '5px'
    },
    paragraphFont: {
        fontSize: '14px',
        lineHeight: '14px',
        color: '#656D78'
    }
}));

const HeroSliderConfigs = {
    parallax: true,
    loop: true,
    centeredSlides: true,
    speed: 500,
    effect: 'slide',
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
        type: 'fraction'
    },
    rebuildOnUpdate: true,
    slidesPerView: 1,
    spaceBetween: 0,
};

export default function ProductView({ product }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const reviewApi = new ManagerApi('/catalog/review');
    const [translate, i18n] = useTranslation();
    const [openDrawer, setOpenDrawer] = useState(null);
    const [buyFrame, setBuyFrame] = useState(false);
    const [shippingQuotes, setShippingQuotes] = useState({
        success: true,
        message: '',
        quotes: [],
    });

    const store = useSelector((state) => state.interface.store);

    const validationSchema = Yup.object().shape({
        zipcode: Yup.string().max(255).required(translate('errorRequiredField'))
    });

    const isConfigurable = false;
    const hasAttributes = false;
    const hasBanners = false;

    const theme = useTheme();
    const mobileSize = !(useMediaQuery(theme.breakpoints.up('sm')));

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
            <p>em <strong>{instalmentRule.quantity}x</strong> de <strong>{formatPrice(instalmentRule.price)}</strong><br />sem juros</p>
        )
    }

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
            <Chip label={label} />
        );
    }

    const getPriceBlock = () => {

        if (!product.saleable) {
            return (<></>);
        }

        if (hasDiscount()) {
            return (
                <Box mb={3}>
                    <Box display="flex" alignItems="center">
                        <Typography component={Box} className={classes.priceOld} pr={1}>
                            {formatPrice(product.price)}
                        </Typography>
                        {getDiscountTag()}
                    </Box>
                    <Box display="flex" alignItems="baseline">
                        <h2><span>R$</span>{formatPriceBlock(product.finalPrice)}</h2>
                        {/* <p className={classes.paragraphFont}>&nbsp;à vista com desconto</p> */}
                        {getInstalmentBlock()}
                    </Box>
                </Box>
            )
        } else {
            return (
                <Box mb={3}>
                    <Box display="flex" alignItems="baseline">
                        <Typography component={Box} className={classes.priceFinal}>
                            <h2><span>R$</span>{formatPriceBlock(product.finalPrice)}</h2>
                        </Typography>
                        {getInstalmentBlock()}
                        {/* <p className={classes.paragraphFont}>&nbsp;à vista com desconto</p> */}
                    </Box>
                </Box>
            )
        }
    }

    const fetchReview = () => {
        const requestId = uuidv4();
        let productId = product.id;
        if (!productId) {
            return;
        }

        // dispatch(addLoadingGlobal(requestId));
        // productId && reviewApi.getList({ product: productId }).then((response) => {
        //     if (response.data.success) {
        //         setReview(response.data.content);
        //         dispatch(removeLoadingGlobal(requestId));
        //     }
        // });
    };

    useEffect(() => {
        fetchReview();
    }, []);

    let videos = [];
    if (product.youtubeUrl) {
        let videoId = "";

        if (videoId = product.youtubeUrl.match(/(\?|&)v=([^&#]+)/)) {
            videoId = videoId.pop();
        } else if (videoId = product.youtubeUrl.match(/(\.be\/)+([^\/]+)/)) {
            videoId = videoId.pop();
        } else if (videoId = product.youtubeUrl.match(/(\embed\/)+([^\/]+)/)) {
            videoId = videoId.pop().replace('?rel=0', '');
        }

        if (videoId) {
            videos = [
                {
                    image: "https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg",
                    url: "https://www.youtube.com/embed/" + videoId
                }
            ]
        }

    }

    let params = {
        speed: 1500,
        rebuildOnUpdate: true,
        observer: true,
        // centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        slidesPerView: mobileSize ? 1 : 4,
        spaceBetween: 30,
    };

    if (product.relatedProducts.length > 1) {
        params.pagination = {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        };
        params.navigation = {
            nextEl: !mobileSize && ".swiper-button-next",
            prevEl: !mobileSize && ".swiper-button-prev",
        };
    }

    const addProduct = () => {
        buyFrame ? setBuyFrame(false) : setBuyFrame(true);
    };

    const getAttributes = (attributes) => {
        return attributes.map(item =>
            <li key={item.id}>
                <p>{item.attribute.name}: {item.text}</p>
            </li>
        )
    };

    const handleDrawerOpen = (drawerId) => {
        setBuyFrame(false)
        if (openDrawer === drawerId) {
            drawerId = null
        }
        setOpenDrawer(drawerId);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(null);
    };

    return (
        <>
            <section className="s-quadros">
                <div className="container">
                    <div className="title-detalhes">
                        <h2>{product.name}</h2>
                    </div>
                    <div className="geral-prod">
                        <div className="galeria">
                            <Slider
                                images={product.medias}
                                videos={videos}
                                configs={HeroSliderConfigs}
                                isThumbnail
                                withoutNavigation
                            />
                        </div>
                        <div className="info-geral-quadro">
                            <div className="name-prod-mb">
                                <h2>Quadro Porta Rolhas de Vinho Preto 23x33cm - This house</h2>
                            </div>
                            <div className="valor-btn">
                                <div className="left">
                                    {getPriceBlock()}
                                </div>
                                {product.saleable ? (
                                    <Formik
                                        initialValues={{ quantity: '1' }}
                                        enableReinitialize
                                        // validationSchema={validationSchema}
                                        onSubmit={async (values) => {
                                            dispatch(addProductCart(product.id, values.quantity));
                                        }}
                                    >
                                        {({
                                            handleBlur,
                                            handleSubmit,
                                            values,
                                            setValues,
                                        }) => {

                                            const handleChange = (e) => {
                                                let { name, value } = e.target;
                                                value = parseInt(value);

                                                if (value > product.stock) {
                                                    setValues({ ...values, [name]: product.stock });
                                                    dispatch(addMessage(`A quantidade máxima desse produto é ${product.stock}`, 'error'));

                                                    return;
                                                };

                                                if (value < 0) {
                                                    return;
                                                }

                                                setValues({ ...values, [name]: value })
                                            }

                                            return (
                                                <Form onSubmit={handleSubmit} >
                                                    <Box display="flex" alignItems="center">
                                                        {/* <Box mr={2} style={{ maxWidth: '80px' }}>
                                                            <TextField
                                                                // error={Boolean(touched.name && errors.name)}
                                                                type="number"
                                                                // helperText={touched.name && errors.name}
                                                                label="Qtde."
                                                                name="quantity"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.quantity}
                                                                variant="outlined"
                                                            />
                                                        </Box> */}
                                                        <Box flexGrow={1}>
                                                            <button type="submit" className="btn-green" onClick={addProduct}>ADICIONAR NO CARRINHO</button>
                                                        </Box>
                                                    </Box>
                                                </Form>
                                            )
                                        }}
                                    </Formik>

                                ) : (
                                    <button type="button" disabled className="btn-green">PRODUTO INDISPONÍVEL</button>
                                )}
                            </div>
                            <div className="frete-prazo">
                                <div className="form-cep">
                                    <h3>FRETE E PRAZO DE ENTREGA:</h3>
                                    <Formik
                                        initialValues={defaultFormShape}
                                        enableReinitialize
                                        validationSchema={validationSchema}
                                        onSubmit={async (values) => {
                                            let requestId = uuidv4();
                                            const shippingQuoteApi = new ManagerApi('/shipping/quote');
                                            let params = {
                                                zipcode: values.zipcode,
                                                products: [{
                                                    product: product.id,
                                                    quantity: 1
                                                }]
                                            }

                                            setShippingQuotes({
                                                success: true,
                                                quotes: []
                                            });

                                            dispatch(addLoadingGlobal(requestId));
                                            const response = await shippingQuoteApi.getList(params);
                                            setShippingQuotes({
                                                success: response.data.success,
                                                message: response.data.message,
                                                quotes: response.data.success ? response.data.content : []
                                            });
                                            dispatch(removeLoadingGlobal(requestId));
                                        }}
                                    >
                                        {({
                                            errors,
                                            handleBlur,
                                            handleChange,
                                            handleSubmit,
                                            isSubmitting,
                                            touched,
                                            values
                                        }) => {
                                            return (
                                                <Form onSubmit={handleSubmit} >
                                                    <InputMask
                                                        mask={"99999-999"}
                                                        maskChar=" "
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.zipcode}
                                                    >
                                                        {() => (
                                                            <input
                                                                type="text"
                                                                placeholder="Meu CEP é:"
                                                                name='zipcode'
                                                            />
                                                        )}
                                                    </InputMask>

                                                    <button type="submit" disabled={isSubmitting} className="btn-gray">
                                                        <img src={arrowZipcode} alt="" />
                                                    </button>
                                                </Form>
                                            )
                                        }}
                                    </Formik>
                                </div>
                                {shippingQuotes.success === false ? (
                                    <Box mt={3}>
                                        <Alert severity="error">
                                            {shippingQuotes.message} Por favor, entre em contato conosco.
                                        </Alert>
                                    </Box>
                                ) : (
                                    <>
                                        {shippingQuotes.quotes.length !== 0 && (
                                            <ul className="list-frete">
                                                {shippingQuotes.quotes.map((shippingQuote, key) => (
                                                    <li key={key}>
                                                        <span>
                                                            {shippingQuote.description} - Em até {shippingQuote.deliveryTime}&nbsp;
                                                                            {shippingQuote.deliveryTime === 1 ?
                                                                translate('infoShippingQuoteWithOneDay') :
                                                                translate('infoShippingQuote')
                                                            }
                                                        </span>
                                                        <strong>{formatPrice(shippingQuote.total)}</strong>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="descricao-quadro">
                                <div class="left">
                                    <ul>
                                        <li>
                                            <div class="txt">
                                                <p><strong>REFERÊNCIA:</strong> {product.sku}</p>
                                            </div>
                                        </li>
                                        {product.description !== null &&
                                            <li>
                                                <div class="txt">
                                                    <p><strong>DESCRIÇÃO:</strong> <HTMLView html={product.description} /></p>
                                                </div>
                                            </li>
                                        }
                                    </ul>
                                </div>
                                {product.attributes.length > 0 && (
                                    <div class="right">
                                        <h4>INFORMAÇÕES TÉCNICAS</h4>
                                        <ul>
                                            {product.height !== null && (
                                                <li><p>Altura do quadro (cm): {Number.parseInt(product.height)}</p></li>
                                            )}
                                            {product.width !== null && (
                                                <li><p>Largura do quadro (cm): {Number.parseInt(product.width)}</p></li>
                                            )}
                                            {getAttributes(product.attributes)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            {(product.relatedProducts && product.relatedProducts.length) ? (
                                <div className="similares">
                                    <h3>IMAGENS SIMILARES</h3>
                                    <Box mt={3}>
                                        <Container maxWidth="lg">
                                            <Grid container spacing={3} >
                                                <Grid item xs={12}>
                                                    <div
                                                        className={classes.swiperMainContainer}
                                                        style={{ maxWidth: mobileSize ? '100%' : '1280px', height: mobileSize ? '' : '100%' }}
                                                    >
                                                        <Swiper {...params}>
                                                            {product.relatedProducts.map(item => (
                                                                <div className={classes.swiperMainSlide}>
                                                                    <ProductCard isProductView product={item.related} />
                                                                </div>
                                                            ))}
                                                        </Swiper>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Container>
                                    </Box>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>
            {buyFrame && (
                <Box className='open-modal'>
                    <div className="modal">
                        <div className="overlay-modal"></div>
                        <div className="box">
                            <button type="button" onClick={addProduct} className="close js-close-modal">
                                <img src={iconClose} alt="" />
                            </button>
                            <img src={iconOk} alt="" />
                            <h3>Seu quadro foi adicionado com sucesso à sua sacola!</h3>
                            <p>Você deseja personalizar o próximo quadro da sua lista de favoritos?</p>
                            <div className="btns">
                                <button type="button" className="btn-gray" onClick={addProduct}>SIM, CONTINUAR</button>
                                <button type="button" className="btn-green js-open-carrinho" onClick={() => handleDrawerOpen('cart')}>NÃO, IR PARA O CARRINHO</button>
                            </div>
                        </div>
                    </div>
                </Box>
            )}
            <DrawerCart handleDrawerClose={handleDrawerClose} openDrawer={openDrawer === 'cart'} />
        </>
    )
}
