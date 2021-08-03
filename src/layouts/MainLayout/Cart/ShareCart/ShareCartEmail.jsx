import React from 'react';
import {
    Box,
    Button,
    TextField,
    Divider,
} from '@material-ui/core';
import ClassShareCart from 'src/models/ShareCartModels';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

let classShareCart = new ClassShareCart();

const defaultFormShape = classShareCart.getObjects;

export default function ShareCartEmail({onSubmit}) {
    const [translate, i18n] = useTranslation();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(translate('errorRequiredField')),
        email: Yup.string().email(translate('errorEmailField')).required(translate('errorRequiredField')),
        emailTo: Yup.string().email(translate('errorEmailField')).required(translate('errorRequiredField')),
        message: Yup.string().required(translate('errorRequiredField')),
    });

    return (
        <Formik
            initialValues={defaultFormShape}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={async (values, {
                // setErrors,
                // setStatus,
                setSubmitting
            }) => {
                try {
                    onSubmit(values);
                } catch (error) {
                    // setStatus({ success: false });
                    // setErrors({ submit: error.message });
                }
                setSubmitting(false);
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
                        onSubmit={handleSubmit}
                    >
                        <Box mb={3} mr={2}>
                            <TextField
                                error={Boolean(touched.name && errors.name)}
                                helperText={touched.name && errors.name}
                                fullWidth
                                margin='normal'
                                label={translate('titleLabelNameCart')}
                                name="name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                                fullWidth
                                margin='normal'
                                label={translate('titleLabelEmailCart')}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(touched.emailTo && errors.emailTo)}
                                helperText={touched.emailTo && errors.emailTo}
                                fullWidth
                                margin='normal'
                                label={translate('titleLabelEmailToCart')}
                                name="emailTo"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.emailTo}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(touched.message && errors.message)}
                                helperText={touched.message && errors.message}
                                fullWidth
                                multiline
                                rows={4}
                                margin='normal'
                                label={translate('titleLabelMessageToCart')}
                                name="message"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.message}
                                variant="outlined"
                            />
                        </Box>
                        <Box mr={2}>
                            <Divider />
                        </Box>
                        <Box mt={2} mr={2} display="flex" justifyContent='flex-end'>
                            <Box ml={2}>
                                <Button
                                    color='primary'
                                    type="submit"
                                    variant='contained'
                                    disabled={isSubmitting}
                                >
                                    {translate('buttonSend')}
                                </Button>
                            </Box>
                        </Box>
                    </form>
                )}
        </Formik>
    )
}
