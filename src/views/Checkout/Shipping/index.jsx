import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
    useTheme,
    useMediaQuery,
    Box,
} from '@material-ui/core';
import { addLoadingGlobal, removeLoadingGlobal, addMessage, fetchCart } from 'src/actions';
import AddressModel from 'src/models/AddressModel';
import ClassUserAddresses from 'src/models/UserAddressesModels';
import ManagerApi from 'src/services/managerApi';

import iconLupaWhite from 'src/theme/img/icon-lupa-white.svg';
import imgClose from 'src/theme/img/close-search.svg';
import AddressComponent from 'src/components/Address';

let classUserAddresses = new ClassUserAddresses();
let addressModel = new AddressModel();

const defaultFormShape = classUserAddresses.getObjects;

export default function Shipping({ order, updateOrder }) {
    const dispatch = useDispatch();
    const addressApi = new ManagerApi('/customer/address');
    const saleOrderApi = new ManagerApi('/sale/order');
    const userAccount = useSelector((state) => state.account.user);
    const store = useSelector((state) => state.interface.store);
    const [changeEmail, setChangeEmail] = useState(false);
    const [addAddress, setAddAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [changeShipping, setChangeShipping] = useState(false);
    const [shippingQuotes, setShippingQuotes] = useState({
        success: true,
        message: '',
        quotes: [],
    });

    const theme = useTheme();
    const mobileSize = !(useMediaQuery(theme.breakpoints.up('sm')));

    const validationSchema = Yup.object().shape({
        // name: Yup.string().max(255).required(translate('errorRequiredField')),
        // zipcode: Yup.string().min(9, translate('errorMinimunString')).required(translate('errorRequiredField')),
        // street: Yup.string().max(255).required(translate('errorRequiredField')),
        // number: Yup.string().max(255).required(translate('errorRequiredField')),
        // complement: Yup.string().max(255),
        // district: Yup.string().max(255).required(translate('errorRequiredField')),
        // city: Yup.string().max(255).required(translate('errorRequiredField')),
        // region: Yup.string().max(255).required(translate('errorRequiredField')),
    });

    const handleChangeEmail = () => {
        changeEmail ? setChangeEmail(false) : setChangeEmail(true);
    };

    const handleAddAddress = () => {
        addAddress ? setAddAddress(false) : setAddAddress(true);
    };

    const handleChangeShipping = () => {
        changeShipping ? setChangeShipping(false) : setChangeShipping(true);
    };

    const handleChangeAddress = (e) => {
        setSelectedAddress(e.target.value);

        const dataAddress = {
            shipment: {
                carrier: null,
                method: null,
                customerAddress: e.target.value
            }
        }

        updateOrder(dataAddress);
    };

    const handleChangeAddressDefault = (address) => {
        if (order.customer.addresses.length === 0)
            return;
            
        // let addressDefault = order?.customer?.addresses?.filter(item => item.zipcode === address.addressZipcode)[0];
        let addressDefault = order?.customer?.addresses[0];

        setSelectedAddress(addressDefault);

        const dataAddress = {
            shipment: {
                carrier: order.shipment.carrier,
                method: order.shipment.method,
                customerAddress: order?.customer?.addresses[0].id//addressDefault.id
            }
        }

        updateOrder(dataAddress);
    };

    const fetchShippingQuotes = () => {
        if (!selectedAddress || !selectedAddress.zipcode) {
            return;
        }

        const shippingQuoteApi = new ManagerApi('/shipping/quote');
        let params = {
            zipcode: selectedAddress.zipcode,
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

        const requestId = uuidv4();
        dispatch(addLoadingGlobal(requestId));
        shippingQuoteApi.getList(params).then((response) => {
            dispatch(removeLoadingGlobal(requestId));
            setShippingQuotes({
                success: response.data.success,
                message: response.data.message,
                quotes: response.data.success ? response.data.content : []
            });
        });

    };

    useEffect(() => {
        fetchShippingQuotes();
    }, [selectedAddress]);

    useEffect(() => {
        if (order.shipment.addressZipcode) {
            handleChangeAddressDefault(order.shipment);
        }
    }, [order.customer.addresses.length]);

    return (

        <>
            <div className="dados">
                <div className="item">
                    <div className="dado-cadastrado">
                        <div className="info">
                            <h4>Qual seu e-mail?</h4>
                            <span>{order.customer?.email}</span>
                        </div>
                        <a style={{ cursor: 'pointer' }} onClick={handleChangeEmail} className="js-mudar-dados">Mudar</a>
                    </div>
                    <Formik
                        initialValues={{ email: '' }}
                        enableReinitialize
                        onSubmit={async (values) => {
                            const requestId = uuidv4();
                            dispatch(addLoadingGlobal(requestId));

                            const customerApi = new ManagerApi('/customer/' + userAccount.id);
                            let data = {
                                email: values.email
                            };

                            const response = await customerApi.post(data);

                            dispatch(removeLoadingGlobal(requestId));
                            updateOrder(values.email);

                            if (response.data.success) {
                                dispatch(addMessage('Email atualizado com sucesso.', 'success'));
                            }
                        }}
                    >
                        {({
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            values,
                        }) => {
                            return (
                                <form onSubmit={handleSubmit} style={{ display: changeEmail ? 'block' : 'none' }}>
                                    <div className="cont">
                                        <div className="form-group">
                                            <label htmlFor="">Seu e-mail</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Seu e-mail é:"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                name='email'
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit">Salvar</button>
                                            <button type="button" onClick={handleChangeEmail} className="js-close-form-alterar-dados">
                                                <img src={imgClose} alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )
                        }}
                    </Formik>
                </div>
                <div className="item">
                    <div className="dado-cadastrado">
                        {order.customer.addresses.length === 0 ? (
                            <>
                                <div className="info">
                                    <h4>Você ainda não possui endereço cadastrado.</h4>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="info" style={{ width: '100%' }}>
                                    <h4>Endereço de entrega:</h4>
                                    {addressModel.setData(order.shipment)}
                                    <Box display='flex' mb={2}>
                                        <Box>
                                            <span className="end">{addressModel.getAddressLabelOrder()} - {order.shipment.addressCity}/{order.shipment.addressRegion}</span>
                                        </Box>
                                    </Box>

                                    <select onChange={(e) => { e.preventDefault(); handleChangeAddress(e) }}>
                                        {order.customer.addresses.map(item => {
                                            addressModel.setData(item);
                                            return (
                                                <option style={{ marginBottom: '2px' }} key={item.id} value={item.id}>{addressModel.getAddressLabel()} - {item.city}/{item.region}</option>
                                            )
                                        })}
                                    </select>

                                </div>
                            </>
                        )}
                    </div>
                    <div
                        className="cep-end"
                        style={{ display: order.customer.addresses.length === 0 || addAddress ? 'block' : 'none' }}
                    >
                        <Formik
                            initialValues={defaultFormShape}
                            enableReinitialize
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setValues, resetForm }) => {
                                values.customer = userAccount.customer;

                                const response = await addressApi.post(values);
                                if (response.data) {
                                    dispatch(addMessage(response.data.message, response.data.success ? 'success' : 'error'));

                                    if (response.data.success) {
                                        setAddAddress(false);
                                        setValues({});
                                        resetForm({});
                                        dispatch(fetchCart(order.id));
                                    }
                                }
                            }}
                        >
                            {(formikProps) => {
                                return <AddressComponent formikProps={formikProps} />
                            }}
                        </Formik>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Box mt={1} display='flex' justifyContent='flex-end' alignItems='flex-end'>
                            <a onClick={handleAddAddress} style={{ cursor: 'pointer' }} className="js-mudar-endereco">Novo</a>
                        </Box>
                    </div>
                </div>
                <div className="item">
                    <div className="dado-cadastrado">
                        <div className="info">
                            <h4>Tipo de frete escolhido:</h4>
                            <span className="end">{order?.shipment?.carrier} - {order?.shipment?.description} | {order?.shipment?.deliveryTime} dias úteis</span>
                        </div>
                        <a onClick={handleChangeShipping} style={{ cursor: 'pointer' }}>Mudar</a>
                    </div>

                    <div className="cont">
                        <Formik
                            initialValues={defaultFormShape}
                            enableReinitialize
                            validationSchema={validationSchema}
                            onSubmit={async () => {

                            }}
                        >
                            {({ handleBlur }) => {

                                const handleChangeShippingQuote = async (e) => {
                                    let shippingSelected = shippingQuotes.quotes.filter(item => item.id === e.target.value)[0];

                                    let requestId = uuidv4();

                                    let params = {
                                        shipment: {
                                            carrier: shippingSelected.carrier,
                                            method: shippingSelected.method,
                                            customerAddress: selectedAddress.id
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

                                return (
                                    <form action="" style={{ display: changeShipping ? 'block' : 'none' }}>
                                        <Box display='flex'>
                                            <div className="form-group">
                                                <label htmlFor="">Tipo de frete</label>
                                                <select onChange={handleChangeShippingQuote} onBlur={handleBlur} name='shipping'>
                                                    {shippingQuotes.quotes.map(item => {
                                                        return (
                                                            <option key={item.id} value={item.id}>{item.description}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <Box ml={1} mt={2.8}>
                                                <div className="form-group">
                                                    <button type="submit">Salvar</button>
                                                    <button type="button" className="js-close-form-alterar-dados" onClick={handleChangeShipping}>
                                                        <img src={imgClose} alt="" />
                                                    </button>
                                                </div>
                                            </Box>
                                        </Box>
                                    </form>
                                )
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
            <div className="box-cupom">
                <h2>Cupom de desconto</h2>
                <form action="">
                    <input type="text" className="form-control js-input-cupom" placeholder="Tem um cupom de desconto?" />
                    <button type="submit" disabled>
                        <img src={iconLupaWhite} alt="" />
                    </button>
                </form>
            </div>
        </>
    )
}