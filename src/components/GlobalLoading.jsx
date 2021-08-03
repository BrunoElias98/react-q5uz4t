import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Backdrop, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: theme.zIndex.drawer + 2000,
        color: '#fff',
    },
}));

function GlobalLoading() {
    const classes = useStyles();
    
    const loading = useSelector((state) => state.interface.globalLoading);

    return (
        <Backdrop className={classes.root} open={loading.open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default GlobalLoading;