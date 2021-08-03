import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { removeMessage } from 'src/actions';

function Alert(props) {
    return <MuiAlert elevation={2} variant="filled" {...props} />;
}
export default function GlobalMessage() {
    const dispatch = useDispatch();

    const propsAlert = useSelector((state) => state.interface.globalMessage);
    const handleSnackbarClose = () => {
        dispatch(removeMessage());
    };

    const { open, severity, message } = propsAlert;

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            style={{ zIndex: '9999999999' }}
        >
            {severity !== '' ?
                <Alert onClose={handleSnackbarClose} severity={severity}>
                    {message}
                </Alert>
                : null}
        </Snackbar>
    );
}