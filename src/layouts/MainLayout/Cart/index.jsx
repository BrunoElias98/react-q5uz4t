import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import InputMask from 'react-input-mask';
import { Link as RouterLink } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import {
    Divider,
    Drawer,
    IconButton,
    Typography,
    Box,
    makeStyles,
    FormControlLabel,
    Checkbox,
    Link
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import {
    ChevronRight as ChevronRightIcon,
    ChevronLeft as ChevronLeftIcon,
} from 'react-feather';
import ManagerApi from 'src/services/managerApi';
import ClassValidateZipcode from 'src/models/ValidateZipCodeModels';
import { addLoadingGlobal, removeLoadingGlobal, deleteItemCart, updateItemCart, fetchCart } from 'src/actions';
import Login from 'src/layouts/MainLayout/Login';
import { formatPriceBlock } from 'src/utils/functions';

import imgArrow from 'src/theme/img/arrow-right-white.svg';
import imgGoogle from 'src/theme/img/google.png';
import imgClearsale from 'src/theme/img/clearsale.png';
import imgGeoTrust from 'src/theme/img/geotrust.png';
import imgVisa from 'src/theme/img/visa.png';
import imgMaster from 'src/theme/img/master.png';
import imgElo from 'src/theme/img/elo.png';
import imgAmerican from 'src/theme/img/american.png';
import imgDiners from 'src/theme/img/diners.png';
import imgHipercad from 'src/theme/img/hipercard.png';
import imgBillet from 'src/theme/img/boleto.png';
import iconRemove from 'src/theme/img/icon-remove-red.svg';
import iconClose from 'src/theme/img/icon-close-menu.svg';

let classValidateZipcode = new ClassValidateZipcode();

const defaultFormShape = classValidateZipcode.getObjects;

const drawerWidth = 460;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        maxWidth: "100%",
        zIndex: '99999999'
    },
    drawerContainer: {
    },
    drawerHeader: {
        padding: theme.spacing(1)
    },
    drawerContent: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    productMedia: {
        width: '80px;',
        height: '80px;',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    deleteItemCart: {
        padding: '4px',
        margin: '4px'
    },
    fontGift: {
        fontWeight: '500',
        fontSize: '12px',
        lineHeight: '14px',
        color: '#2F3640',
    },
    notItems: {
        fontSize: '16px',
        lineHeight: '18px',
        color: '#656D78',
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        '&:before': {
            borderRadius: '50%',
            display: 'block',
            width: '10px',
            height: '10px',
            backgroundColor: '#72B12C',
            content: '""',
            marginTop: '3.1px'
        },
    },
    checkbox: {
        width: '18px',
        height: '18px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #CCCFD6',
        borderRadius: '3px',
        marginRight: '12px',
    },
}));

function StyledCheckbox(props) {
    const classes = useStyles();

    return (
        <Checkbox
            className={classes.checkbox}
            disableRipple
            color="default"
            checkedIcon={<CheckIcon style={{ height: '16px', width: '16px', color: '#72B12C', }} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
};

export default function DrawerCart({ handleDrawerClose, openDrawer }) {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const userAccount = useSelector((state) => state.account.user);
    const order = useSelector((state) => state.cart.order);
    const [translate, i18n] = useTranslation();
    const [userLogin, setUserLogin] = useState(false);
    const [shippingSelected, setShippingSelected] = useState({ quotes: {} });
    const [shippingQuotes, setShippingQuotes] = useState({
        success: true,
        message: '',
        quotes: [],
    });
    const [gift, setGift] = useState({
        isGift: false,
        sendMessage: false,
        giftMessage: ''
    });
    const [zipcode, setZipcode] = useState('');

    const shippingQuoteApi = new ManagerApi('/shipping/quote');
    const saleOrderApi = new ManagerApi('/sale/order');

    const validationSchema = Yup.object().shape({
        zipcode: Yup.string().max(255).required(translate('errorRequiredField'))
    });

    const handleRedirectPayment = async () => {
        let requestId = uuidv4();

        let params = { isGift: gift.isGift, giftMessage: gift.giftMessage };

        dispatch(addLoadingGlobal(requestId));

        const response = await saleOrderApi.put(`${order.id}`, params);
        if (response.data.success) {
            dispatch(removeLoadingGlobal(requestId));
        } else {
            dispatch(removeLoadingGlobal(requestId));
        }

        if (userAccount === null) {
            setUserLogin(true);
            handleDrawerClose();
        } else {
            handleDrawerClose();
            history.push('/onestepcheckout');
        }
    };

    const handleChangeShippingDefault = async () => {
        let shippingSelected = shippingQuotes.quotes[0];

        setShippingSelected({ quotes: shippingSelected });

        let requestId = uuidv4();

        let params = {
            shipment: {
                carrier: shippingSelected.carrier,
                method: shippingSelected.method,
                zipcode: zipcode
            }
        }

        dispatch(addLoadingGlobal(requestId));

        const response = await saleOrderApi.put(`${order.id}`, params);
        if (response.data.success) {
            dispatch(removeLoadingGlobal(requestId));
            dispatch(fetchCart(order.id));
        } else {
            dispatch(removeLoadingGlobal(requestId));
        }
    };

    useEffect(() => {
        if (shippingQuotes.quotes.length > 0) {
            handleChangeShippingDefault();
        }
    }, [shippingQuotes.quotes.length]);

    return (
        <Drawer
            anchor="right"
            open={openDrawer}
            onClose={handleDrawerClose}
            style={{ zIndex: '999999999' }}
            classes={{
                paper: classes.drawer
            }}
        >
            <Box className={classes.drawerContainer}>
                <Box
                    className={classes.drawerHeader}
                    width="100%"
                    display="flex"
                    alignItems="center"
                >
                    <Box flexGrow={1} display="flex" alignItems="center">
                        <Box mr={1}>
                            <IconButton onClick={handleDrawerClose}>
                                {openDrawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </Box>
                        <Box>
                            <Typography variant="h4">
                                {translate('typographyMyCart')}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider />
                <Box className={classes.drawerContent} pb={5} className='open-sidebar-carrinho'>
                    <aside className="sidebar-carrinho">
                        <button type="button" className="close js-close-aside" onClick={handleDrawerClose}>
                            <img src={iconClose} alt="" />
                        </button>
                        <div className="header-aside">
                            <span>MINHA SACOLA <strong>2</strong></span>
                            <button className="js-close-aside">
                                <img src={iconClose} alt="" />
                            </button>
                        </div>
                        {userLogin && (
                            <Login openDrawer={userLogin} handleDrawerClose={handleDrawerClose} />
                        )}
                        <div className="cont-carrinho" style={{ display: !userLogin ? 'block' : 'none' }}>
                            <div className="title">
                                <h2>Minha Sacola</h2>
                            </div>
                            <div className="cont-geral">
                                <Formik
                                    initialValues={defaultFormShape}
                                    enableReinitialize
                                    validationSchema={validationSchema}
                                    onSubmit={async (values) => {
                                        let requestId = uuidv4();
                                        let params = {
                                            zipcode: values.zipcode,
                                            products: []
                                        }

                                        order.items.map((item, i) => {
                                            params.products.push({
                                                product: item.productId,
                                                quantity: item.quantity
                                            })
                                        });

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
                                        setValues,
                                        values
                                    }) => {

                                        const handleChangeQuantity = (e, id) => {
                                            dispatch(updateItemCart(id, e.target.value));
                                        };

                                        const handleChangeShipping = async (e) => {
                                            let shippingSelected = shippingQuotes.quotes.filter(item => item.id === e.target.value)[0];

                                            setShippingSelected({ quotes: shippingSelected });

                                            let requestId = uuidv4();

                                            let params = {
                                                shipment: {
                                                    carrier: shippingSelected.carrier,
                                                    method: shippingSelected.method,
                                                    zipcode: values.zipcode
                                                }
                                            }

                                            dispatch(addLoadingGlobal(requestId));

                                            const response = await saleOrderApi.put(`${order.id}`, params);
                                            if (response.data.success) {
                                                dispatch(removeLoadingGlobal(requestId));
                                                dispatch(fetchCart(order.id));
                                            } else {
                                                dispatch(removeLoadingGlobal(requestId));
                                            }
                                        };

                                        const handleChangeCheckbox = (e) => {
                                            const { name, checked } = e.target;

                                            setGift({ ...gift, [name]: checked });
                                        };

                                        const handleChangeGiftMessage = (e) => {
                                            const { name, value } = e.target;

                                            setGift({ ...gift, [name]: value });
                                        };

                                        const handleChangeZipcode = (e) => {
                                            const { name, value } = e.target;

                                            setZipcode(value);
                                            setValues({ ...values, [name]: value });
                                        };

                                        return (
                                            order.items.length > 0 ?
                                                <Form onSubmit={handleSubmit}>
                                                    {order.items.map(item =>
                                                        <div className="all-prods-cart" key={item.id}>
                                                            <div className="item-prod">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => dispatch(deleteItemCart(item.id))}
                                                                    className="btn-remove js-btn-remove-prod"
                                                                >
                                                                    <img src={iconRemove} alt="" />
                                                                </button>
                                                                <div className="foto">
                                                                    <img src={item.mediaUrl} alt="" />
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <div className="box-personalizacao">
                                                                    <div className="left">
                                                                        <strong>Personalizações efetuadas:</strong>
                                                                        {item?.attributes?.map(item =>
                                                                            <p>{item?.text}</p>
                                                                        )}
                                                                        {/* <p>{item.shortDescription !== null && item.shortDescription.substring(0, 100) + '...'}</p> */}
                                                                    </div>
                                                                    <Link component={RouterLink} to={`/${item.url}`} onClick={handleDrawerClose}>
                                                                        alterar
                                                                    </Link>
                                                                </div>
                                                                <div className="qtd-valor">
                                                                    <div className="left">
                                                                        <span>Qtde:</span>
                                                                        <select
                                                                            onChange={(e) => handleChangeQuantity(e, item.id)}
                                                                            onBlur={handleBlur}
                                                                            value={item.quantity}
                                                                            name='quantity'
                                                                        >
                                                                            <option value="1" selected>1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                        </select>
                                                                    </div>
                                                                    <h4><span>R$</span> {formatPriceBlock(item.price)}</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="presente" style={{ marginTop: '10px' }}>
                                                        <FormControlLabel
                                                            value={gift.isGift}
                                                            control={
                                                                <StyledCheckbox
                                                                    checked={gift.isGift}
                                                                    name="isGift"
                                                                    onChange={handleChangeCheckbox}
                                                                />
                                                            }
                                                            label={
                                                                <div>
                                                                    <div className="square"></div>
                                                                    <span className={classes.fontGift}>Este pedido é um presente?</span>
                                                                </div>
                                                            }
                                                        />
                                                        <FormControlLabel
                                                            style={{ display: gift.isGift ? 'block' : 'none' }}
                                                            value={gift.sendMessage}
                                                            control={
                                                                <StyledCheckbox
                                                                    checked={gift.sendMessage}
                                                                    name="sendMessage"
                                                                    onChange={handleChangeCheckbox}
                                                                />
                                                            }
                                                            label={
                                                                <div>
                                                                    <div className="square"></div>
                                                                    <span className={classes.fontGift}>Quer adicionar uma mensagem ao presente?</span>
                                                                </div>
                                                            }
                                                        />
                                                        <textarea
                                                            onChange={handleChangeGiftMessage}
                                                            name='giftMessage'
                                                            value={gift.giftMessage}
                                                            style={{ display: gift.isGift && gift.sendMessage ? 'block' : 'none' }}
                                                        />
                                                    </div>
                                                    <div className="frete">
                                                        <div className="form-cep">
                                                            <span>Seu CEP:</span>
                                                            <InputMask
                                                                mask={"99999-999"}
                                                                maskChar=" "
                                                                onBlur={handleBlur}
                                                                onChange={handleChangeZipcode}
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
                                                            <button type="submit" id="js-buscar-cep" disabled={isSubmitting}>
                                                                <img src={imgArrow} alt="" />
                                                            </button>
                                                        </div>
                                                        <Box mt={2} />
                                                        <div className="dados-entrega" style={{ display: shippingQuotes.quotes.length > 0 && 'block' }}>
                                                            <div className="tipo-entrega">
                                                                <label htmlFor="">Tipo de envio:</label>
                                                                <select onChange={handleChangeShipping} onBlur={handleBlur} name='shipping'>
                                                                    {shippingQuotes.quotes.map(item => {
                                                                        return (
                                                                            <option key={item.id} value={item.id}>{item.description}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                            </div>
                                                            <div className="valor-frete">
                                                                {shippingSelected.quotes.id && (
                                                                    <>
                                                                        <span>Valor do Frete:</span>
                                                                        <h4><span>R$</span> {formatPriceBlock(shippingSelected.quotes.total)}</h4>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sub-total">
                                                        {order.id && order?.shipment?.method !== '' && (
                                                            <>
                                                                <span>Sub-total:</span>
                                                                <h3><span>R$</span> {formatPriceBlock(order.totalFinal)}</h3>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="parcelas">
                                                        <span>Parcele em até</span>
                                                        <strong>3x sem juros!</strong>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn-pagamento"
                                                        onClick={handleRedirectPayment}
                                                        disabled={Object.keys(shippingSelected.quotes).length > 0 ? false : true}
                                                    >
                                                        {Object.keys(shippingSelected.quotes).length > 0 ? 'IR PARA O PAGAMENTO' : 'Selecione um tipo de envio'}
                                                    </button>
                                                    <div className="seguro">
                                                        <span>Você está numa conexão segura:</span>
                                                        <ul>
                                                            <li><img src={imgGoogle} alt="" /></li>
                                                            <li><img src={imgClearsale} alt="" /></li>
                                                            <li><img src={imgGeoTrust} alt="" /></li>
                                                        </ul>
                                                        <ul className="list-brands">
                                                            <li><img src={imgVisa} alt="" /></li>
                                                            <li><img src={imgMaster} alt="" /></li>
                                                            <li><img src={imgElo} alt="" /></li>
                                                            <li><img src={imgAmerican} alt="" /></li>
                                                            <li><img src={imgDiners} alt="" /></li>
                                                            <li><img src={imgHipercad} alt="" /></li>
                                                            <li><img src={imgBillet} alt="" /></li>
                                                        </ul>
                                                    </div>
                                                </Form>
                                                : (
                                                    <p className={classes.notItems}>Você ainda não possui itens no carrinho.</p>
                                                )
                                        )
                                    }}
                                </Formik>
                            </div>

                        </div>
                    </aside>
                </Box>
            </Box>
        </Drawer>
    )
}
