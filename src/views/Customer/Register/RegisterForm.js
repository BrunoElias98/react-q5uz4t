import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InputMask from 'react-input-mask';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
	Box,
	Checkbox,
	FormHelperText,
	makeStyles,
	FormControlLabel,
	Divider,
	RadioGroup,
	Radio,
	Link
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { Formik } from 'formik';
import ManagerApi from 'src/services/managerApi';
import * as Yup from 'yup';
import { login } from 'src/actions/accountActions';
import { addMessage } from 'src/actions';
import ClassUserRegister from 'src/models/UserRegisterModels';

const useStyles = makeStyles(() => ({
	divider: {
		width: '100%',
		height: 1,
	},
	spanTerms: {
		color: '#0e65d8',
		fontSize: '12px',
		fontWeight: '700'
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
	span: {
		color: '#656d78',
		fontSize: '13px',
		fontWeight: '300',
	},
	checkbox: {
		width: '18px',
		height: '18px',
		backgroundColor: '#FFFFFF',
		border: '1px solid #CCCFD6',
		borderRadius: '3px',
		marginRight: '12px',
	},
	radioButton: {
		width: '24px',
		height: '24px',
		borderRadius: '12px',
		border: '1px solid #cccfd6',
		backgroundColor: '#ffffff',
		marginRight: '6px',
		display: '-webkit-box',
		display: '-ms-flexbox',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
}));

let classUserRegister = new ClassUserRegister();

const defaultFormShape = classUserRegister.getObjects;

function StyledRadio(props) {
	const classes = useStyles();

	return (
		<Radio
			className={classes.radioButton}
			disableRipple
			color="default"
			checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
			icon={<span className={classes.icon} />}
			{...props}
		/>
	);
};

function StyledCheckbox(props) {
	const classes = useStyles();

	return (
		<Checkbox
			className={classes.checkbox}
			disableRipple
			color="default"
			checkedIcon={<CheckIcon style={{ height: '16px', width: '16pxpx', color: '#72B12C', }} />}
			icon={<span className={classes.icon} />}
			{...props}
		/>
	);
};

function RegisterForm({ className, onSubmitSuccess, customerGroup, ...rest }) {
	const [translate, i18n] = useTranslation();
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const validationSchema = Yup.object().shape({
		// name: Yup.string().max(255).required(translate('errorRequiredField')),
		// document: Yup.string().min(14, translate('errorMinimunString')).max(20).required(translate('errorRequiredField')),
		// phone: Yup.string().min(14, translate('errorMinimunString')).max(255).required(translate('errorRequiredField')),
		// email: Yup.string().email(translate('errorEmailField')).max(255).required(translate('errorRequiredField')),
		// password: Yup.string().min(6, translate('errorMinimunStringInPassword')).matches(/[a-zA-Z]/, translate('errorStringRequiredInPassword')).required(translate('errorRequiredField')),
		// type: Yup.string().required(translate('errorRequiredField')),
		policy: Yup.boolean().oneOf([true], translate('errorRequiredField')),
	});

	const redirectHome = () => {
		history.push('/');
	};

	return (
		<Formik
			initialValues={defaultFormShape}
			validationSchema={validationSchema}
			enableReinitialize
			onSubmit={async (values) => {
				const customerApi = new ManagerApi('/customer');
				const response = await customerApi.post(values);
				if (response.data) {
					dispatch(addMessage(response.data.message, response.data.success ? 'success' : 'error'));
					if (response.data.success) {
						const loginResponse = await dispatch(login(values.email, values.password));
						if (loginResponse) {
							onSubmitSuccess();
						}
					}
				}
			}}
		>
			{({
				errors,
				handleBlur,
				handleChange,
				handleSubmit,
				isSubmitting,
				touched,
				values,
			}) => {

				const maskBuilderPhone = value => {
					return (value.length > 14) ? '(99) 99999-9999' : '(99) 9999-99999';
				};

				return (
					<>

						<section className="s-cadastro">
							<div className="container">
								<div className="box-formulario">
									<form
										className={clsx(classes.root, className)}
										onSubmit={handleSubmit}
										{...rest}
									>
										<div className="area-gray form-row d-flex justify-center align-items-center">
											<label htmlFor="" className="label-control">Eu sou:</label>
											<select
												className="select-tipo js-select-tipo-pessoa"
												error={Boolean(touched.type && errors.type)}
												helperText={touched.type && errors.type}
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.type}
												name='type'
											>
												<option value="person">Pessoa Física</option>
												<option value="company">Pessoa Jurídica</option>
											</select>
										</div>
										<div className="area-white">
											<div className="two-columns">
												<div className="form-group input-pj" style={{ display: values.type === 'company' ? 'block' : 'none' }}>
													<label htmlFor="" className="label-control">Razão Social:</label>
													<input
														error={Boolean(touched.legalName && errors.legalName)}
														helperText={touched.legalName && errors.legalName}
														type="text"
														placeholder="Minha razão social é:"
														className="form-control"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.legalName}
														name='legalName'
													/>
												</div>
												<div className="form-group input-pj" style={{ display: values.type === 'company' ? 'block' : 'none' }}>
													<label htmlFor="" className="label-control">Nome Fantasia:</label>
													<input
														error={Boolean(touched.name && errors.name)}
														helperText={touched.name && errors.name}
														type="text"
														placeholder="Meu nome fantasia é:"
														className="form-control"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.name}
														name='name'
													/>
												</div>
												<div className="form-group input-pf" style={{ display: values.type === 'person' ? 'block' : 'none' }}>
													<label htmlFor="" className="label-control">Qual seu nome?</label>
													<input
														error={Boolean(touched.name && errors.name)}
														helperText={touched.name && errors.name}
														type="text"
														placeholder="Meu nome é:"
														className="form-control"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.name}
														name='name'
													/>
												</div>
												<div className="form-group">
													<label htmlFor="" className="label-control">Qual seu e-mail?</label>
													<input
														error={Boolean(touched.email && errors.email)}
														helperText={touched.email && errors.email}
														type="email"
														placeholder="Meu e-mail é:"
														className="form-control"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.email}
														name='email'
													/>
												</div>
												<div className="form-group">
													<label htmlFor="" className="label-control">Telefone celular:</label>
													<InputMask
														mask={maskBuilderPhone(values.phone)}
														maskChar={null}
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.phone}
														className="form-control"
													>
														{() => (
															<input
																error={Boolean(touched.phone && errors.phone)}
																helperText={touched.phone && errors.phone}
																type="text"
																placeholder="DDD + telefone:"
																className="form-control"
																name='phone'
															/>
														)}
													</InputMask>
												</div>
												<div className="form-group">
													<label htmlFor="" className="label-control">Tem outro telefone?</label>
													<InputMask
														mask={maskBuilderPhone(values.otherPhone)}
														maskChar={null}
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.otherPhone}
													>
														{() => (
															<input
																error={Boolean(touched.otherPhone && errors.otherPhone)}
																helperText={touched.otherPhone && errors.otherPhone}
																type="text"
																placeholder="DDD + telefone:"
																className="form-control"
																name='otherPhone'
															/>
														)}
													</InputMask>
												</div>
												<div className="form-group input-pj" style={{ display: values.type === 'company' ? 'block' : 'none' }}>
													<label htmlFor="" className="label-control">Responsável:</label>
													<input
														error={Boolean(touched.responsible && errors.responsible)}
														helperText={touched.responsible && errors.responsible}
														type="text"
														placeholder="Nome do responsável:"
														className="form-control"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.responsible}
														name='responsible'
													/>
												</div>
											</div>
										</div>
										<div className="area-gray d-flex justify-space-between">
											<div className="form-group input-pf" style={{ display: values.type === 'person' ? 'block' : 'none' }}>
												<label htmlFor="" className="label-control">Informe seu CPF:</label>
												<InputMask
													mask="999.999.999-99"
													maskChar={null}
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.document}
												>
													{() =>
														<input
															type="text"
															placeholder="Meu CPF é:"
															className="form-control input-md"
															name='document'
														/>}
												</InputMask>
											</div>
											<div className="form-group input-pj" style={{ display: values.type === 'company' ? 'block' : 'none' }}>
												<label htmlFor="" className="label-control">Informe seu CNPJ:</label>
												<InputMask
													mask="99.999.999/9999-99"
													maskChar={null}
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.document}
												>
													{() =>
														<input
															type="text"
															placeholder="Meu CNPJ é:"
															className="form-control input-md"
															name='document'
														/>
													}
												</InputMask>
											</div>
											<div className="form-group input-pj" style={{ display: values.type === 'company' ? 'block' : 'none' }}>
												<label htmlFor="" className="label-control">Inscrição Estadual:</label>
												<div className="input-ie">
													<input
														type="text"
														placeholder="Minha Ins.Estadual:"
														className="form-control"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.stateRegistration}
														name='stateRegistration'
														disabled={values.taxFree ? true : false}
													/>
													<Box ml={2}>
														<FormControlLabel value="female"
															control={
																<StyledCheckbox
																	checked={values.taxFree}
																	name="taxFree"
																	onChange={handleChange}
																/>
															}
															label={
																<div>
																	<div className="square"></div>
																	<span className={classes.span}>Isento?</span>
																</div>
															}
														/>
													</Box>
												</div>
											</div>
											<div
												className="form-group input-pf"
												style={{ display: values.type === 'person' ? 'block' : 'none' }}
											>
												<label htmlFor="" className="label-control">Sua data de nascimento:</label>
												<InputMask
													mask="99/99/9999"
													maskChar={null}
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.birthDate}
												>
													{() =>
														<input
															type="text"
															placeholder="Data de nascimento:"
															className="form-control input-md"
															name='birthDate'
														/>
													}
												</InputMask>
											</div>
											<div className="form-group">
												<Box ml={2}>
													<label htmlFor="" className="label-control">Seu sexo:</label>
													<RadioGroup name="gender" value={values.gender} onChange={handleChange}>
														<Box display="flex" flexDirection="columns">
															<FormControlLabel
																value="male"
																control={<StyledRadio />}
																label={
																	<>
																		<div className="circle"></div>
																		<span className={classes.span}>Masculino</span>
																	</>
																}
															/>
															<FormControlLabel
																value="female"
																control={<StyledRadio />}
																label={
																	<>
																		<div className="circle"></div>
																		<span className={classes.span}>Feminino</span>
																	</>
																}
															/>
														</Box>
													</RadioGroup>
												</Box>
											</div>
										</div>
										<div className="area-white">
											<div className="pass d-flex justify-center align-items-center">
												<div className="form-group">
													<label htmlFor="" className="label-control">Cadastre uma senha:</label>
													<input
														type="password"
														placeholder="Sua senha:"
														className="form-control input-md"
														error={Boolean(touched.password && errors.password)}
														helperText={touched.password && errors.password}
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.password}
														name='password'
													/>
												</div>
												<div className="form-group">
													<label htmlFor="" className="label-control">Repita a senha:</label>
													<input
														type="password"
														placeholder="Sua senha:"
														className="form-control input-md"
														error={Boolean(touched.confirmPassword && errors.confirmPassword)}
														helperText={touched.confirmPassword && errors.confirmPassword}
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.confirmPassword}
														name='confirmPassword'
													/>
												</div>
											</div>
										</div>
										<div className="area-gray d-flex flex-column justify-center align-items-center">
											<div>
												<Box
													alignItems="center"
													display="flex"
												>
													<FormControlLabel value="female"
														control={
															<StyledCheckbox
																checked={values.newsletter}
																name="newsletter"
																onChange={handleChange}
															/>
														}
														label={
															<div>
																<div className="square"></div>
																<span className={classes.span}>Eu gostaria de receber novidades e promoções da On The Wall.</span>
															</div>
														}
													/>
												</Box>
												<Box
													alignItems="center"
													display="flex"
												>
													<FormControlLabel value="female"
														control={
															<StyledCheckbox
																checked={values.policy}
																name="policy"
																onChange={handleChange}
															/>
														}
														label={
															<div>
																<div className="square"></div>
																<span className={classes.span}>
																	Li e concordo com o
																	<Link component={RouterLink} to="/termos-uso" className={"js-open-termos " + classes.spanTerms}> Termos de uso</Link> desse website.
																</span>
															</div>
														}
													/>
												</Box>
												{Boolean(touched.policy && errors.policy) && (
													<FormHelperText error>
														{errors.policy}
													</FormHelperText>
												)}
												<Box mt={2}>
													<Divider className={classes.divider} />
												</Box>
											</div>
										</div>
										<div className="area-btn">
											<button
												type="submit"
												className={values.policy ? "btn-green" : "btn-gray"}
												disabled={isSubmitting}
											>
												SALVAR MEU CADASTRO
											</button>
										</div>
									</form>
								</div>
							</div>
						</section>
					</>
				)
			}}
		</Formik>
	);
}

RegisterForm.propTypes = {
	className: PropTypes.string,
	onSubmitSuccess: PropTypes.func
};

RegisterForm.default = {
	onSubmitSuccess: () => { }
};

export default RegisterForm;
