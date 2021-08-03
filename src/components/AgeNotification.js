import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Button,
    Link,
    Portal,
    Typography,
    makeStyles,
    Dialog,
    DialogContent
} from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        maxWidth: 600,
        position: 'fixed',
        bottom: 0,
        left: 0,
        margin: theme.spacing(3),
        padding: theme.spacing(3),
        outline: 'none',
        zIndex: 2000
    },
    action: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    }
}));

function AgeNotification() {
    const store = useSelector((state) => state.interface.store);
    const classes = useStyles();
    const [translate, i18n] = useTranslation();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        Cookies.set('ageConsent', 'true');
        setOpen(false);
    };

    useEffect(() => {
        const consent = Cookies.get('ageConsent');

        if (!consent) {
            setOpen(true);
        }
    }, []);

    if (!store.interface.ageNotification || !open) {
        return null;
    }

    return (
        <Portal>
            <Dialog open={open}>
                <img src="/static/vivalti/age-consent.jpg"/>
                <Button fullWidth color="primary" variant="contained" onClick={handleClose} style={{borderRadius: '0'}} size="large">
                    Este site é destinado para maiores de 18 anos.<br/> Clique aqui para acessar.
                </Button>
            </Dialog>
        </Portal>
    );
}

export default AgeNotification;
