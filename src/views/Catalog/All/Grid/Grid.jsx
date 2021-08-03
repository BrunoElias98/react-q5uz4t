import React, { useState } from 'react';
import {
    Grid,
    Container,
    Box,
    Select,
    MenuItem,
    makeStyles,
    OutlinedInput,
    Typography
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useTranslation } from 'react-i18next';
import Drawer from './Drawer/Drawer';
import ProductCard from 'src/components/ProductCard';

const useStyles = makeStyles(() => ({
    icon: {
        fill: '0',
    },
    select: {
        borderColor: 'white',
        '&:before': {
            borderColor: 'white',
        },
        '&:after': {
            borderColor: 'white',
        }
    },
}));

const useOutlinedInputStyles = makeStyles(theme => ({
    root: {
        "& $notchedOutline": {
            borderColor: "white"
        },
        "&:hover $notchedOutline": {
            borderColor: "white"
        },
        "&$focused $notchedOutline": {
            borderColor: "white"
        }
    },
    focused: {},
    notchedOutline: {}
}));

export default function GridProducts({ title, description, products, attributes, onPaginate, paginator, onSortOrder, onFilter, filters }) {
    const classes = useStyles();
    const outlinedInputClasses = useOutlinedInputStyles();
    const [translate, i18n] = useTranslation();
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState('ascPrice');

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleOrder = (event) => {
        setOrder(event);

        if (event === 'descPrice') {
            onSortOrder({ saleable: 'DESC', finalPrice: 'DESC' });
        } else if (event === 'ascPrice') {
            onSortOrder({ saleable: 'DESC', finalPrice: 'ASC' });
        } else if (event === 'descName') {
            onSortOrder({ saleable: 'DESC', name: 'DESC' });
        } else if (event === 'ascName') {
            onSortOrder({ saleable: 'DESC', name: 'ASC' });
        }
    }

    if (!products) {
        return <></>;
    }

    let hasFilter = (attributes && attributes.length > 0);
    if (attributes && attributes.length > 0) {
        let options = attributes.filter((attribute) => {
            return (attribute.type === "select" || attribute.type === "multiselect")
        })
        hasFilter = (options.length > 0)
    }

    let hasProducts = (products && products.length > 0);

    return (
        <>
            <Container maxWidth="lg">

                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Box>
                        {title && title.length && (
                            <Typography variant="h1">
                                {title}
                            </Typography>
                        )}
                        {description && description.length && (
                            <Typography variant="subtitle1">
                                { description}
                            </Typography>
                        )}
                    </Box>
                    <Box>
                        <div style={{ border: '2px solid black', borderRadius: '4px', borderColor: 'rgba(0, 0, 0, 0.23)' }}>
                            <Select
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={order}
                                onChange={(event) => handleOrder(event.target.value)}
                                variant='outlined'
                                size='small'
                                className={classes.select}
                                input={
                                    <OutlinedInput
                                        name="age"
                                        id="outlined-age-simple"
                                        classes={outlinedInputClasses}
                                    />
                                }
                            >
                                <MenuItem value='ascName'>{translate('orderAscName')}</MenuItem>
                                <MenuItem value='descName'>{translate('orderDescName')}</MenuItem>
                                <MenuItem value='ascPrice'>{translate('orderAscPrice')}</MenuItem>
                                <MenuItem value='descPrice'>{translate('orderDescPrice')}</MenuItem>
                            </Select>
                        </div>
                    </Box>
                </Box>

                <Box mt={3}>
                    <Grid container spacing={3}>
                        {hasFilter && (
                            <Grid item md={3} xs={12} >
                                <Drawer products={products} attributes={attributes} onFilter={onFilter} filters={filters} />
                            </Grid>
                        )}
                        <Grid item md={(hasFilter ? 9 : 12)} xs={12} >
                            <Grid container spacing={3} >
                                {hasProducts && (
                                    <>
                                        {products.map((item, i) => (
                                            <Grid key={i} item md={3} xs={12} >
                                                <ProductCard product={item} index={i} />
                                            </Grid>
                                        ))}
                                        {paginator && paginator.pageLast > 1 && (
                                            <Grid item md={12} xs={12} >
                                                <Box
                                                    display='flex'
                                                    justifyContent='center'
                                                    mb={2}
                                                    mt={1}
                                                >
                                                    <Pagination
                                                        count={paginator.pageLast}
                                                        page={paginator.pageCurrent}
                                                        color="secondary"
                                                        onChange={onPaginate}
                                                    />
                                                </Box>
                                            </Grid>
                                        )}
                                    </>
                                )}
                                {!hasProducts && (
                                    <Grid item md={12} xs={12} >
                                        <Box
                                            display='flex'
                                            flexDirection='column'
                                            justifyContent='center'
                                            mb={2}
                                            mt={1}
                                        >
                                            <Typography
                                                align="center"
                                                variant="h2"
                                                gutterBottom
                                            >
                                                Nenhum produto encontrado.
                                            </Typography>
                                            <Typography
                                                align="center"
                                                variant="subtitle1"
                                            >
                                                Infelizmente não encontramos nenhum produto para a sua busca.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}
