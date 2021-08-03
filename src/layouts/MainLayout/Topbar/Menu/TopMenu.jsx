import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
    makeStyles,
    Button,
    Box,
    Link,
    Container,
    Grid,
    Menu,
    MenuItem,
    Popper,
    Paper,
    ClickAwayListener,
    MenuList,
    Grow,
} from '@material-ui/core';
// import MenuCategories from './Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        ...theme.components.header.secondary
    },
    button: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        color: theme.components.header.secondary.text
    },
}));

function TopMenu() {
    const classes = useStyles();
    const [translate, i18n] = useTranslation();
    const categories = useSelector((state) => state.interface.globalData.categoriesMenu);

    const [open, setOpen] = useState(null);
    const [ref, setRef] = useState(null);
    
    const handleOpen = (event, category) => {
        setRef(event.target);
        setOpen(category.id);
    };
    const handleClose = (event) => {
        setOpen(null);
    };

    return (
        <Box className={classes.root}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                onMouseLeave={handleClose}
            >
                <Grid item>
                    <Button component={RouterLink} to='/sobre-nos' className={classes.button}>
                        A Vinícola
                    </Button>
                </Grid>
                <Grid item>
                    <Button component={RouterLink} to='/catalogo' className={classes.button}>
                        Produtos
                    </Button>
                </Grid>
                <Grid item>
                    <Button component={RouterLink} to='/contato' className={classes.button}>
                        Contato
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

TopMenu.propTypes = {
    className: PropTypes.string
};

export default TopMenu;
