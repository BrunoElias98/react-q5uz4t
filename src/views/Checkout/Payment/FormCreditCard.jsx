import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import pagarme from 'pagarme/browser';
import { Box } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { addLoadingGlobal, removeLoadingGlobal } from 'src/actions';

import imgDica from 'src/theme/img/dica.png';
import imgCvv from 'src/theme/img/cvv.jpeg';
import iconLock from 'src/theme/img/icon-lock.png';

export default function FormCreditCard({ order, formikProps }) {
    const { values, handleChange, handleBlur, handleSubmit, setValues } = formikProps;
    const dispatch = useDispatch();

    const card = {
        card_number: values.numberCreditCard,
        card_holder_name: values.nameCreditCard,
        card_expiration_date: values.expirationMonth + values.expirationYear,
        card_cvv: values.codeSecurity,
    };
    
    const generateSenderHash = () => {
        const requestId = uuidv4();

        if (values.nameCreditCard === undefined) {
            return;
        }

        if (
            values.numberCreditCard.length >= 16 &&
            values.nameCreditCard !== '' &&
            values.codeSecurity !== '' &&
            values.expirationMonth.length === 2 &&
            values.expirationYear.length === 2
        ) {
            dispatch(addLoadingGlobal(requestId));
            pagarme.client.connect({ encryption_key: 'ek_test_QVgq1bIk4DLbmFoDw0XW2XDj7L9vqq' })
                .then(client => client.security.encrypt(card))
                .then(card_hash => {
                    setValues({ ...values, cardToken: card_hash });
                    dispatch(removeLoadingGlobal(requestId));
                })
        }
    };

    useEffect(() => {
        if (order.transaction && order.transaction.additionalInformation) {
            pagarme.setSessionId(order.transaction.additionalInformation.sessionId);
        }
        generateSenderHash();
    }, []);

    const detectMob = () => {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];

        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    };

    const generateInstallment = () => {
        let values = [];
        let options = [];

        for (let cont = 1; cont < 13; cont++) {
            values.push(cont);
        }

        values.map((value, i) => {
            options.push(<option key={i} value={value}>{value}</option>)
        });

        return options;
    };

    if (values.nameCreditCard === undefined) {
        return <></>;
    }

    return (
        <>
            <Box display={detectMob() ? 'block' : 'flex'} >
                <form>
                    <div className="form-group">
                        <select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.installment}
                            name='installment'
                        >
                            <option value="" selected>Quantidade de parcelas:</option>
                            {generateInstallment()}
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Número do cartão"
                            name="numberCreditCard"
                            onBlur={(e) => { handleBlur(e); generateSenderHash() }}
                            onChange={handleChange}
                            value={values.numberCreditCard}
                            maxLength='16'
                        />
                        <img src={iconLock} className="icon" alt="" />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome do cartão"
                            name="nameCreditCard"
                            onBlur={(e) => { handleBlur(e); generateSenderHash() }}
                            onChange={handleChange}
                            value={values.nameCreditCard}
                        />
                    </div>
                    <div className="validade">
                        <div className="data">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="MM"
                                name="expirationMonth"
                                onBlur={(e) => { handleBlur(e); generateSenderHash() }}
                                onChange={handleChange}
                                value={values.expirationMonth}
                            />
                            <span>/</span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="AA"
                                name="expirationYear"
                                onBlur={(e) => { handleBlur(e); generateSenderHash() }}
                                onChange={handleChange}
                                value={values.expirationYear}
                            />
                        </div>
                        <div className="cvv">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="CCV"
                                name="codeSecurity"
                                onBlur={(e) => { handleBlur(e); generateSenderHash() }}
                                onChange={handleChange}
                                value={values.codeSecurity}
                            />
                            <div className="tooltip">
                                <img src={imgDica} alt="" />
                                <div className="balao">
                                    <img src={imgCvv} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={handleSubmit}>EFETUAR PAGAMENTO</button>
                    </div>
                </form>
            </Box>
        </>
    )
};