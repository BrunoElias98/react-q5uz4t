import React from 'react';
import {
    makeStyles,
    Container,
    Box,
    Typography,
    Grid
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    image: {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100%',
        height: '300px'
    },
    imageFull: {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100%',
        height: '450px'
    }
}));

export default function Banners({ product }) {
    const classes = useStyles();
    const [translate, i18n] = useTranslation();

    return (
        <>
            <Box mt={5}>
                <div className={classes.imageFull} style={ { backgroundImage: "url('http://placehold.it/1920x450')" } }></div>
            </Box>
            
            <Box mt={5}>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
                                <Typography variant="h2">
                                    Lorem ipsum dolor sit amet.
                                </Typography>
                                <Box mt={3}>
                                    <Typography variant="body1" color="textSecondary">
                                        Nulla sem quam, aliquam vel ullamcorper quis, ultricies quis diam. Praesent lorem mi, vehicula eu imperdiet vel, efficitur in magna. Nam at elementum nulla. Etiam nibh augue, volutpat in tortor in, interdum suscipit nibh.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className={classes.image} style={ { backgroundImage: "url('http://placehold.it/600x300')" } }></div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box mt={5}>
                <Container maxWidth="lg">
                    <Grid container spacing={3} direction="row-reverse">
                        <Grid item xs={12} md={6}>
                            <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
                                <Typography variant="h2">
                                    Sed auctor condimentum lacus
                                </Typography>
                                <Box mt={3}>
                                    <Typography variant="body1" color="textSecondary">
                                        Pellentesque semper tortor dolor, a varius turpis scelerisque eu. In eleifend, ipsum quis dignissim suscipit, velit quam volutpat nunc, sit amet bibendum ligula nibh et urna. Nulla a nulla nisl. Ut quam neque, dapibus sed lacus iaculis, porta posuere lectus. Ut pretium eu lacus at luctus. Mauris sollicitudin accumsan rutrum.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className={classes.image} style={ { backgroundImage: "url('http://placehold.it/600x300')" } }></div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}
