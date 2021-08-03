import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { ErrorMessage, Formik, Form as FormikForm, Field } from 'formik';
import { Link } from '@material-ui/core';
import { addLoadingGlobal, removeLoadingGlobal, addMessage } from 'src/actions';
import Page from 'src/components/Page';
import ClassContact from 'src/models/ContactModels';
import ManagerApi from 'src/services/managerApi';

import imgIconInformation from 'src/theme/img/icon-information.svg';

let classContact = new ClassContact();

const defaultFormShape = classContact.getObjects;

export default function Index() {
    const dispatch = useDispatch();
    const contactApi = new ManagerApi('/contact');

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório.'),
        email: Yup.string().required('Campo obrigatório.'),
        phone: Yup.string().required('Campo obrigatório.'),
        message: Yup.string().required('Campo obrigatório.')
    });

    return (
        <Page
            title="Fale Conosco"
        >
            <section className="title-page-institucional">
                <div className="container">
                    <div className="title">
                        <h2>Fale Conosco</h2>
                    </div>
                </div>
            </section>

            <section className="s-contato">
                <div className="container">
                    <div className="geral">
                        <div className="form-txt">
                            <p>
                                Se sentir necessidade de falar conosco, preencha o formulário abaixo ou entre em contato por outras formas
                                utilizando o box ao lado.
                            </p>
                            <p>
                                De qualquer maneira, ficaremos muito felizes em lhe ajudar e esclarecer suas dúvidas.
                            </p>
                            <Formik
                                initialValues={defaultFormShape}
                                enableReinitialize
                                validationSchema={validationSchema}
                                validateOnChange={false}
                                validateOnBlur={false}
                                onSubmit={(values) => {
                                    const requestId = uuidv4();
                                    let data = new FormData();
                                    data = values;

                                    dispatch(addLoadingGlobal(requestId));

                                    contactApi.post(data).then(response => {

                                        dispatch(removeLoadingGlobal(requestId));
                                        
                                        if (response.data.success) {
                                            dispatch(addMessage('Mensagem enviada com sucesso.', 'success'));
                                        } else {
                                            dispatch(addMessage('Erro ao enviar mensagem.', 'error'));
                                        }
                                    }).catch(err => {
                                        dispatch(addMessage('Erro ao enviar mensagem.', 'error'));
                                        dispatch(removeLoadingGlobal(requestId));
                                    });
                                }}
                            >
                                {({ handleBlur, handleChange, isSubmitting, handleSubmit }) => (
                                    <FormikForm onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="">Qual seu nome?</label>
                                            <Field
                                                type="text"
                                                placeholder="Meu nome é:"
                                                name="name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage component="span" name="name" style={{ color: '#fd7e14' }} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Qual seu e-mail?</label>
                                            <Field
                                                type="email"
                                                placeholder="Meu e-mail é:"
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage component="span" name="email" style={{ color: '#fd7e14' }} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Telefone preferencial:</label>
                                            <Field
                                                type="text"
                                                placeholder="DDD + telefone:"
                                                mask="phone"
                                                name="phone"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage component="span" name="phone" style={{ color: '#fd7e14' }} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">O que você gostaria de nos falar?</label>
                                            <Field
                                                placeholder="Escreva sua mensagem:"
                                                name="mensagem"
                                                as="textarea"
                                                name="message"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage component="span" name="message" style={{ color: '#fd7e14' }} />
                                        </div>
                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                ENVIAR MENSAGEM
                                            </button>
                                        </div>
                                    </FormikForm>
                                )}
                            </Formik>
                        </div>
                        <div className="right">
                            <div className="box-duvidas">
                                <div className="title">
                                    <h3>SE AINDA TIVER DÚVIDAS</h3>
                                </div>
                                <div className="cont">
                                    <div className="left">
                                        <img src={imgIconInformation} alt="" />
                                        <h4>Escolha a melhor opção para entrar em contato!</h4>
                                    </div>
                                    <ul>
                                        <li>
                                            <div className="info">
                                                <p><strong>Fone:</strong> (47) 3521-7830</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="info">
                                                <p><strong>sac@onthewall.com.br</strong></p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="info">
                                                <a href="#">Chat Online</a>
                                                <span>De Segunda a sexta-feira das 9:00 às 19:00h</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="info">
                                                <Link component={RouterLink} to="/perguntas-frequentes">Dúvidas? Acesse aqui nosso FAQ.</Link>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="box-social">
                                <h3>Interaja conosco<br />nas redes sociais</h3>
                                <ul>
                                    <li>
                                        <a href="" target="_blank">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="" target="_blank">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="" target="_blank">
                                            <i className="fa fa-pinterest-p"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Page>
    )
}
