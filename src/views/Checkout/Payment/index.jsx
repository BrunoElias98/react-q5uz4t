import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ClassCreditCard from 'src/models/CreditCardModels';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormCreditCard from './FormCreditCard';
import FormBillet from './FormBillet';

let classCreditCard = new ClassCreditCard();

export default function Payment({ updateOrder, order }) {
    const [translate, i18n] = useTranslation();
    const store = useSelector((state) => state.interface.store);

    const handleFinish = async (values) => {
        let additionalInformation = {};
        if (order.transaction && order.transaction.additionalInformation) {
            additionalInformation = { ...order.transaction.additionalInformation };
        }
        
        additionalInformation = { ...additionalInformation, ...values };

        const dataPayment = {
            status: 'pending',
            transaction: {
                ...order.payment,
                additionalInformation: additionalInformation
            }
        }

        await updateOrder(dataPayment);
    };

    const handleChangeMethod = (paymentMethod) => {

        if (order.transaction && order.transaction.method && order.transaction.method === paymentMethod.id) {
            return;
        }

        const dataMethod = {
            transaction: {
                initialize: true,
                method: paymentMethod.id,
                type: paymentMethod.type,
            }
        }

        updateOrder(dataMethod);
    };

    const initialValues = classCreditCard.getObjects;
    const validationSchema = Yup.object().shape({
        numberCreditCard: Yup.string().max(16).required(translate('errorRequiredField')),
        nameCreditCard: Yup.string().max(100).required(translate('errorRequiredField')),
        expirationMonth: Yup.string().max(2).required(translate('errorRequiredField')),
        expirationYear: Yup.string().max(4).required(translate('errorRequiredField')),
        codeSecurity: Yup.string().max(4).required(translate('errorRequiredField')),
        // dateOfBirth: Yup.string().min(10, translate("errorMinimunString")).required(translate('errorRequiredField')),
        // document: Yup.string().min(14, translate("errorMinimunString")).required(translate('errorRequiredField')),
        // installment: Yup.string().required(translate('errorRequiredField')),
    });

    let formState = {
        initialValues: {},
        validationSchema: null
    };

    if (order?.transaction && order?.transaction?.method === 'pagarmeCreditCard') {
        formState = {
            initialValues: initialValues,
            validationSchema: validationSchema
        };
    }

    return (
        <>
            <div className="title">
                <h3>Formas de Pagamento</h3>
                <p>Todas as transações são seguras e encriptadas.</p>
            </div>
            <div className="formas">
                <Formik
                    initialValues={formState.initialValues}
                    validationSchema={formState.validationSchema}
                    enableReinitialize
                    onSubmit={async (values) => {
                        let data = {};
                        if (order.transaction.method === 'pagarmeCreditCard') {
                            data = {
                                cardToken: values.cardToken,
                                name: values.nameCreditCard,
                                // dateOfBirth: values.dateOfBirth,
                                // brand: values.brand,
                                installment: parseInt(values.installment),
                                bin: values.numberCreditCard.substr(0, 6),
                                end: values.numberCreditCard.substr(12, 16),
                                name: values.nameCreditCard,
                                cpf: order.customer.document,
                            };

                            await handleFinish(data);
                        } else if (order.transaction.method === 'pagseguroBillet') {
                            data = {
                                senderHash: values.senderHash,
                            };

                            await handleFinish(data);
                        } else if (order.transaction.method === 'pagarmeBillet') {
                            await handleFinish();
                        }
                    }}
                >
                    {(formikProps) => {
                        const { handleSubmit } = formikProps;

                        return (
                            <>
                                <form onSubmit={handleSubmit}>
                                    {Object.keys(store.payment).map((paymentMethodId, i) => {
                                        let paymentMethod = store.payment[paymentMethodId];
                                        if (!parseInt(paymentMethod.active)) {
                                            return <></>;
                                        }

                                        return (
                                            <React.Fragment key={i}>
                                                {paymentMethod.type === "creditCard" && (
                                                    <div
                                                        className={order.transaction && order.transaction.method && order.transaction.method === paymentMethod.id ? "item-forma active" : "item-forma"}
                                                        id={paymentMethod.id}
                                                        onClick={(e) => { e.preventDefault(); handleChangeMethod(paymentMethod) }}
                                                    >
                                                        <div className="title">
                                                            <div className="circle"></div>
                                                            <h3>CARTÃO DE CRÉDITO</h3>
                                                        </div>
                                                        <div className="box-form-pag">
                                                            <h5>Escolha seu parcelamento:</h5>
                                                            {order.transaction.method === 'pagarmeCreditCard' && (
                                                                <FormCreditCard order={order} updateOrder={updateOrder} formikProps={formikProps} />
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                {paymentMethod.type === "billet" && (
                                                    <div
                                                        className={order.transaction && order.transaction.method && order.transaction.method === paymentMethod.id ? "item-forma active" : "item-forma"}
                                                        id={paymentMethod.id}
                                                        onClick={(e) => { e.preventDefault(); handleChangeMethod(paymentMethod) }}
                                                    >
                                                        <div className="title">
                                                            <div className="circle"></div>
                                                            <h3>BOLETO BANCÁRIO <span>(-5%)</span></h3>
                                                        </div>
                                                        {order.transaction.method === 'pagarmeBillet' && (
                                                            <FormBillet order={order} updateOrder={updateOrder} formikProps={formikProps} />
                                                        )}

                                                        {order.transaction.method === 'pagseguroBillet' && (
                                                            <FormBillet order={order} updateOrder={updateOrder} formikProps={formikProps} />
                                                        )}
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        )
                                    })}
                                    {/* {order.transaction.method === 'store' && (
                                        <Alert severity="info">Método de pagamento disponível para pagamento presencial na loja.</Alert>
                                    )} */}
                                </form>
                            </>
                        )
                    }}
                </Formik>
            </div>
        </>
    )
}
