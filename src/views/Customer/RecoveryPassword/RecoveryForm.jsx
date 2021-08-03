import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import {
    Box,
    Button,
    TextField,
    Typography,
    makeStyles,
    Grid,
    Divider,
} from '@material-ui/core';
import { Formik } from 'formik';
import ManagerApi from 'src/services/managerApi';
import * as Yup from 'yup';
import { addMessage, addLoadingGlobal, removeLoadingGlobal } from 'src/actions';
import ClassRecoverPassword from 'src/models/RecoverPasswordModels';

const useStyles = makeStyles(() => ({
    divider: {
        width: '100%',
        height: 1,
    },
}));

let classRecoverPassword = new ClassRecoverPassword();

const defaultFormShape = classRecoverPassword.getObjects;

function RecoverForm({ className, onSubmitSuccess, tokenApi, token, ...rest }) {
    const [translate] = useTranslation();
    const recoveryPasswordApi = new ManagerApi('/user/recovery');
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        password: Yup.string().min(6).max(255).required(translate('errorRequiredField')),
        confirmPassword: Yup.string().min(6).max(255).required(translate('errorRequiredField')),
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
                const { password, confirmPassword } = values;
                const requestId = uuidv4();

                let data = new FormData();

                for (let key in values) {
                    data.append(key, values[key]);
                }

                if (password !== confirmPassword) {
                    dispatch(addMessage('As senhas não são iguais', 'error'));
                } else {
                    dispatch(addLoadingGlobal(requestId));
                    recoveryPasswordApi.put(`${token}`, data).then(response => {
                        if (response.data.success) {
                            dispatch(removeLoadingGlobal(requestId));
                            dispatch(addMessage('Senha atualizada.', 'success'));
                            redirectHome();
                        } else {
                            dispatch(removeLoadingGlobal(requestId));
                            dispatch(addMessage(response.data.message, 'error'));
                        }
                    });
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
                values
            }) => (
                <form
                    className={clsx(classes.root, className)}
                    onSubmit={handleSubmit}
                    {...rest}
                >
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <Box display='flex' justifyContent='center'>
                                <Typography variant="h2">
                                    {translate('typographyRecoverPassword')}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <Box display='flex' justifyContent='center'>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.password && errors.password)}
                                        fullWidth
                                        helperText={touched.password && errors.password}
                                        label={translate('titleLabelRecoverPassword')}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="password"
                                        value={values.password}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <Box display='flex' justifyContent='center'>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                        fullWidth
                                        helperText={touched.confirmPassword && errors.confirmPassword}
                                        label={translate('titleLabelRecoverConfirmPassword')}
                                        name="confirmPassword"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="password"
                                        value={values.confirmPassword}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box mt={3}>
                        <Divider className={classes.divider} />
                    </Box>
                    <Box mt={3} display="flex" justifyContent='space-between'>
                        <Button
                            onClick={() => redirectHome()}
                            color="default"
                            variant="contained"
                            size="large"
                        >
                            {translate('buttonBack')}
                        </Button>
                        <Button
                            color="primary"
                            disabled={isSubmitting}
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            {translate('buttonSave')}
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
}

RecoverForm.propTypes = {
    className: PropTypes.string,
    onSubmitSuccess: PropTypes.func
};

RecoverForm.default = {
    onSubmitSuccess: () => { }
};

export default RecoverForm;
