import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import ClassUserAddresses from 'src/models/UserAddressesModels';

let classUserAddresses = new ClassUserAddresses();

const defaultFormShape = classUserAddresses.getObjects;

export default function FormAddress({ setStep, step }) {
    const [address, setAddress] = useState(defaultFormShape);
    const [translate, i18n] = useTranslation();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAddress({ ...address, [name]: value, page: 'payment' });
        setStep({
            ...step,
            shippingAddress: address
        });
    };
    
    return (
        <Grid
            container
            spacing={3}
        >
            <Grid
                item
                xs={12}
            >
                <Typography variant="h4">
                    {translate('typographyContactInfoCustomer')}
                </Typography>
            </Grid>

            <Grid
                item
                md={4}
                xs={12}
            >
                <TextField
                    // error={Boolean(touched.name && errors.name)}
                    // helperText={touched.name && errors.name}
                    fullWidth
                    label={translate('titleLabelNameCustomer')}
                    name="name"
                    // onBlur={handleBlur}
                    onChange={handleChange}
                    value={address.name}
                    variant="outlined"
                    size='small'
                />
            </Grid>
            <Grid
                item
                md={4}
                xs={12}
            >
                <TextField
                    // error={Boolean(touched.phone && errors.phone)}
                    // helperText={touched.phone && errors.phone}
                    fullWidth
                    label={translate('titleLabelPhoneCustomer')}
                    name="phone"
                    // onBlur={handleBlur}
                    onChange={handleChange}
                    value={address.phone}
                    variant="outlined"
                    size='small'
                />
            </Grid>
            <Grid
                item
                xs={12}
            >
                <Typography variant="h4">
                    {translate('typographyAddressCustomer')}
                </Typography>
            </Grid>
            <Grid
                item
                md={12}
                xs={12}
            >
                <TextField
                    // error={Boolean(touched.street && errors.street)}
                    // helperText={touched.street && errors.street}
                    fullWidth
                    label={translate('titleLabelStreetCustomer')}
                    name="street"
                    // onBlur={handleBlur}
                    onChange={handleChange}
                    value={address.street}
                    variant="outlined"
                    size='small'
                />
            </Grid>
            <Grid
                item
                md={6}
                xs={12}
            >
                <TextField
                    // error={Boolean(touched.zipcode && errors.zipcode)}
                    // helperText={touched.zipcode && errors.zipcode}
                    fullWidth
                    label={translate('titleLabelShippingQuote')}
                    name="zipcode"
                    // onBlur={handleBlur}
                    onChange={handleChange}
                    value={address.zipcode}
                    variant="outlined"
                    size='small'
                />
            </Grid>
            <Grid
                item
                md={6}
                xs={12}
            >
                <TextField
                    // error={Boolean(touched.number && errors.number)}
                    // helperText={touched.number && errors.number}
                    fullWidth
                    label={translate('titleLabelNumberCustomer')}
                    name="number"
                    // onBlur={handleBlur}
                    onChange={handleChange}
                    value={address.number}
                    variant="outlined"
                    size='small'
                />
            </Grid>
            <Grid
                item
                md={6}
                xs={12}
            >
                <TextField
                    // error={Boolean(touched.complement && errors.complement)}
                    // helperText={touched.complement && errors.complement}
                    fullWidth
                    label={translate('titleLabelComplementCustomer')}
                    name="complement"
                    // onBlur={handleBlur}
                    onChange={handleChange}
                    value={address.complement}
                    variant="outlined"
                    size='small'
                />
            </Grid>
            <Grid
                item
                md={6}
                xs={12}
            >
                <TextField
                    // error={Boolean(touched.district && errors.district)}
                    // helperText={touched.district && errors.district}
                    fullWidth
                    label={translate('titleLabelDistrictCustomer')}
                    name="district"
                    // onBlur={handleBlur}
                    onChange={handleChange}
                    value={address.district}
                    variant="outlined"
                    size='small'
                />
            </Grid>
            <Grid
                item
                md={6}
                xs={12}
            >
                <TextField
                    // error={Boolean(touched.city && errors.city)}
                    // helperText={touched.city && errors.city}
                    fullWidth
                    label={translate('titleLabelCityCustomer')}
                    name="city"
                    // onBlur={handleBlur}
                    onChange={handleChange}
                    value={address.city}
                    variant="outlined"
                    size='small'
                />
            </Grid>
            <Grid
                item
                md={6}
                xs={12}
            >
                <TextField
                    // error={Boolean(touched.region && errors.region)}
                    // helperText={touched.region && errors.region}
                    fullWidth
                    label={translate('titleLabelRegionCustomer')}
                    name="region"
                    // onBlur={handleBlur}
                    onChange={handleChange}
                    value={address.region}
                    variant="outlined"
                    size='small'
                />
            </Grid>
        </Grid>
    )
}
