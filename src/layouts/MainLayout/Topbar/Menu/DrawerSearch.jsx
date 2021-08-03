import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Form, Formik } from 'formik';
import {
    Divider,
    Drawer,
    IconButton,
    Typography,
    Box,
    Button,
    Grid,
    TextField,
    Container,
    makeStyles
} from '@material-ui/core';
import {
    ChevronRight as ChevronRightIcon,
    ChevronLeft as ChevronLeftIcon,
} from 'react-feather';
import { logout, addLoadingGlobal, removeLoadingGlobal } from 'src/actions';
import ProductCardMenu from 'src/components/ProductCardMenu';
import ManagerApi from 'src/services/managerApi';

const drawerWidth = 460;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        maxWidth: "100%"
    },
    drawerContainer: {
    },
    drawerHeader: {
        padding: theme.spacing(1)
    },
    drawerContent: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    productMedia: {
        width: '80px;',
        height: '80px;',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    deleteItemCart: {
        padding: '4px',
        margin: '4px'
    }
}));

export default function DrawerCart({ handleDrawerClose, openDrawer, order }) {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);

    const categoryApi = new ManagerApi('/catalog/category');
    const productApi = new ManagerApi('/catalog/product');

    const userAccount = useSelector((state) => state.account.user);

    const [menu, setMenu] = useState(null);

    const [openMenu, setOpenMenu] = useState(false);
    const [ref, setRef] = useState(null);

    const fetchData = (term) => {
        const filters = { name: term };
        const requestId = uuidv4();
        dispatch(addLoadingGlobal(requestId));

        productApi.getList(filters).then((response) => {
            dispatch(removeLoadingGlobal(requestId));
            if (response.data.success) {
                setProduct(response.data.content);
            }
        });

        categoryApi.getList(filters).then((response) => {
            dispatch(removeLoadingGlobal(requestId));
            if (response.data.success) {
                setCategory(response.data.content);
            }
        });
    };

    return (
        <Drawer
            anchor="right"
            open={openDrawer}
            onClose={handleDrawerClose}
            classes={{
                paper: classes.drawer
            }}
        >
            <Box className={classes.drawerContainer}>
                <Box
                    className={classes.drawerHeader}
                    width="100%"
                    display="flex"
                    alignItems="center"
                >
                    <Box flexGrow={1} display="flex" alignItems="center">
                        <Box mr={1}>
                            <IconButton onClick={handleDrawerClose}>
                                {openDrawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </Box>
                        <Box>
                            <Typography variant="h4">
                                Buscar
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider />
                <Box className={classes.drawerContent} pb={5}>
                    <Formik
                        initialValues={{ term: '' }}
                        enableReinitialize
                        onSubmit={async (values) => {
                            handleDrawerClose();
                            history.push('/search?query=' + values.term);
                        }}
                    >
                        {({
                            handleBlur,
                            handleSubmit,
                            setValues,
                            values
                        }) => {

                            const generateMenu = () => {
                                let categoryName = [];
                                let categories = [];
                                let products = [];

                                if (product.length > 0 || category.length > 0) {
                                    setOpenMenu(true);
                                } else {
                                    return <></>;
                                }

                                for (let i = 0; i <= 4; i++) {
                                    categories.push(category[i]);
                                }

                                for (let i = 0; i <= 3; i++) {
                                    products.push(product[i]);
                                }

                                for (let i = 0; i <= 1; i++) {
                                    categoryName.push(category[i]);
                                }

                                return (
                                    <Container maxWidth="md" className={classes.menu}>
                                        <Box pt={3} pb={3} onMouseLeave={setOpenMenu(false)}>
                                            <Grid container spacing={1} >
                                                {categoryName.map(item =>
                                                    item !== undefined &&
                                                    <>
                                                        <Grid item xs={12}>
                                                            <Typography style={{ textDecoration: 'none' }} component={RouterLink} to={`/${item.url}`}>
                                                                <div style={{ width: '100%' }}>{item.name} em Todos os departamentos</div>
                                                            </Typography>
                                                        </Grid>
                                                        {item.parent !== null && (
                                                            <Grid item xs={12}>
                                                                <Typography style={{ textDecoration: 'none' }} component={RouterLink} to={`/${item.parent.url}`}>
                                                                    <div style={{ width: '100%' }}>{item.name} em {item.parent.name}</div>
                                                                </Typography>
                                                            </Grid>
                                                        )}
                                                    </>
                                                )}
                                            </Grid>
                                        </Box>
                                        <Divider />
                                        <Box pt={3} pb={3}>
                                            <Grid container spacing={1} >
                                                {products.map(item =>
                                                    item !== undefined &&
                                                    <Grid item xs={12}>
                                                        <ProductCardMenu mobile product={item} />
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </Box>
                                    </Container>
                                )
                            }

                            const handleChangeTerm = async (e) => {
                                const { value } = e.target;

                                setValues({ ...values, term: value });

                                fetchData(value);
                            };

                            return (
                                <>
                                    <Box mt={3}>
                                        <Form onSubmit={handleSubmit}>
                                            <TextField
                                                fullWidth
                                                label="O que você busca?"
                                                name="term"
                                                onBlur={handleBlur}
                                                onChange={handleChangeTerm}
                                                value={values.term}
                                                variant="outlined"
                                            />
                                        </Form>
                                    </Box>
                                    <Box mt={3}>
                                        <Button
                                            fullWidth
                                            size='large'
                                            color='primary'
                                            variant='contained'
                                            onClick={handleSubmit}
                                        >
                                            Buscar
                                        </Button>
                                    </Box>
                                    { generateMenu()}
                                </>
                            )
                        }}
                    </Formik>
                </Box>
            </Box>
        </Drawer>
    )
}
